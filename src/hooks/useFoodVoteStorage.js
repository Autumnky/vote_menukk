import { useState, useEffect } from 'react';

const STORAGE_KEY = 'office_food_voting_v1';
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

  const [userVote, setUserVote] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.userVote || null;
      }
    } catch (err) {
      console.error('Error reading userVote from localStorage:', err);
    }
    return null;
  });

  // บันทึกลง localStorage เมื่อ state มีการเปลี่ยนแปลง
  useEffect(() => {
    try {
      const payload = JSON.stringify({ menus, userVote });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (err) {
      console.error('LocalStorage quota exceeded or error occurred:', err);
      alert('พื้นที่จัดเก็บเต็ม กรุณาลดขนาดภาพหรือลบเมนูที่ไม่จำเป็นออก');
    }
  }, [menus, userVote]);

  // ฟังก์ชันเพิ่มเมนูใหม่
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

  // ฟังก์ชันลบเมนู
  const deleteMenu = (id) => {
    setMenus((prev) => prev.filter((item) => item.id !== id));
    if (userVote === id) {
      setUserVote(null);
    }
  };

  // ฟังก์ชันโหวต / สลับโหวต / กดยกเลิก
  const toggleVote = (targetId) => {
    // กรณีที่ 1: กดยกเลิกโหวตเดิม (คลิกซ้ำที่เมนูเดิม)
    if (userVote === targetId) {
      setMenus((prev) =>
        prev.map((item) =>
          item.id === targetId ? { ...item, votes: Math.max(0, item.votes - 1) } : item
        )
      );
      setUserVote(null);
      return;
    }

    // กรณีที่ 2: เพิ่งโหวตครั้งแรก หรือเปลี่ยนจากเมนูอื่นมาเป็นเมนูนี้
    setMenus((prev) =>
      prev.map((item) => {
        if (item.id === targetId) {
          return { ...item, votes: item.votes + 1 };
        }
        if (userVote && item.id === userVote) {
          return { ...item, votes: Math.max(0, item.votes - 1) };
        }
        return item;
      })
    );
    setUserVote(targetId);
  };

  return {
    menus,
    userVote,
    addMenu,
    deleteMenu,
    toggleVote,
  };
}