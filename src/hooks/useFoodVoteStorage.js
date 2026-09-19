import { useState, useEffect } from 'react';

const STORAGE_KEY = 'office_food_voting_v2';
const FALLBACK_ICONS = ['🍛', '🍜', '🍕', '🍔', '🥗', '🍱', '🥪', '🧋', '🍣', '🍲'];

export function useFoodVoteStorage() {
  const [menus, setMenus] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed.menus) ? parsed.menus : [];
      }
    } catch (err) {
      console.error('Error reading menus from localStorage:', err);
    }
    return [];
  });

  // สถานะปิดโหวต
  const [isVotingClosed, setIsVotingClosed] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Boolean(parsed.isVotingClosed);
      }
    } catch (err) {
      console.error('Error reading isVotingClosed:', err);
    }
    return false;
  });

  // เมนูที่คนที่กำลังถือเครื่องเลือกไว้ชั่วคราว (ยังไม่ได้ส่งต่อ)
  const [currentSelectedId, setCurrentSelectedId] = useState(null);

  // บันทึก LocalStorage
  useEffect(() => {
    try {
      const payload = JSON.stringify({ menus, isVotingClosed });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (err) {
      console.error('LocalStorage error:', err);
    }
  }, [menus, isVotingClosed]);

  // เพิ่มเมนูใหม่
  const addMenu = ({ name, price, imageUrl }) => {
    const randomIcon = FALLBACK_ICONS[Math.floor(Math.random() * FALLBACK_ICONS.length)];
    const newMenu = {
      id: `menu_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      price: Number(price),
      imageUrl: imageUrl || null,
      fallbackIcon: randomIcon,
      votes: 0,
    };
    setMenus((prev) => [newMenu, ...prev]);
  };

  // ลบเมนู
  const deleteMenu = (id) => {
    setMenus((prev) => prev.filter((item) => item.id !== id));
    if (currentSelectedId === id) setCurrentSelectedId(null);
  };

  // เลือกเมนูสำหรับคนปัจจุบัน (ยังไม่สะสมคะแนนจนกว่าจะยืนยัน หรือเลือกแบบกดปุ๊บนับปั๊บ)
  const selectMenuForCurrentPerson = (targetId) => {
    if (isVotingClosed) return;
    // คลิกซ้ำเพื่อยกเลิกการเลือก
    setCurrentSelectedId((prev) => (prev === targetId ? null : targetId));
  };

  // กดยืนยันโหวตเพื่อส่งต่อให้คนถัดไป
  const confirmAndNextVoter = () => {
    if (!currentSelectedId || isVotingClosed) return;

    setMenus((prev) =>
      prev.map((item) =>
        item.id === currentSelectedId ? { ...item, votes: item.votes + 1 } : item
      )
    );
    setCurrentSelectedId(null); // เคลียร์หน้าจอให้คนถัดไปกด
  };

  // สลับสถานะเปิด/ปิดรับโหวต
  const toggleVotingStatus = () => {
    setIsVotingClosed((prev) => !prev);
    setCurrentSelectedId(null);
  };

  // รีเซ็ตคะแนนทั้งหมดเริ่มใหม่
  const resetAllVotes = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตคะแนนโหวตทั้งหมดเป็น 0?')) {
      setMenus((prev) => prev.map((item) => ({ ...item, votes: 0 })));
      setCurrentSelectedId(null);
      setIsVotingClosed(false);
    }
  };

  return {
    menus,
    isVotingClosed,
    currentSelectedId,
    addMenu,
    deleteMenu,
    selectMenuForCurrentPerson,
    confirmAndNextVoter,
    toggleVotingStatus,
    resetAllVotes,
  };
}