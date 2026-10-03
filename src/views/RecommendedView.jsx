// src/views/RecommendedView.jsx
import React, { useState } from 'react';

// ข้อมูลรายการอาหารและเครื่องดื่มแนะนำตั้งต้น พร้อมรูปภาพประกอบ
const RECOMMENDED_ITEMS = [
  {
    id: 'rec-1',
    name: 'ข้าวกะเพราหมูกรอบไข่ดาว',
    price: 65,
    category: 'อาหารจานเดียว',
    emoji: '🍛',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-2',
    name: 'ข้าวผัดต้มยำทะเล',
    price: 70,
    category: 'อาหารจานเดียว',
    emoji: '🍤',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-3',
    name: 'ก๋วยเตี๋ยวเรือน้ำตกหมู',
    price: 50,
    category: 'เส้น',
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-4',
    name: 'ส้มตำไทย + ไก่ย่างข้าวเหนียว',
    price: 90,
    category: 'อีสาน',
    emoji: '🥗',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-5',
    name: 'ข้าวมันไก่ต้มผสมไก่ทอด',
    price: 60,
    category: 'อาหารจานเดียว',
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-6',
    name: 'ผัดไทยกุ้งสด',
    price: 65,
    category: 'เส้น',
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-7',
    name: 'ชาไทยเย็นหวานน้อย',
    price: 45,
    category: 'เครื่องดื่ม',
    emoji: '🧋',
    image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-8',
    name: 'อเมริกาโน่เย็นไม่หวาน',
    price: 55,
    category: 'เครื่องดื่ม',
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rec-9',
    name: 'มัทฉะลาเต้เย็น',
    price: 65,
    category: 'เครื่องดื่ม',
    emoji: '🍵',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
  },
];

export default function RecommendedView({
  existingMenus = [],
  onAddMenu,
  isVotingClosed = false,
}) {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ทั้งหมด', 'อาหารจานเดียว', 'เส้น', 'อีสาน', 'เครื่องดื่ม'];

  // กรองเมนูตามหมวดหมู่และคำค้นหา
  const filteredItems = RECOMMENDED_ITEMS.filter((item) => {
    const matchCategory = selectedCategory === 'ทั้งหมด' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchCategory && matchSearch;
  });

  // เช็คว่ามีเมนูนี้ในรายการโหวตปัจจุบันหรือยัง
  const isAlreadyAdded = (name) => {
    return existingMenus.some(
      (menu) => menu.name?.trim().toLowerCase() === name.trim().toLowerCase()
    );
  };

  const handleQuickAdd = (item) => {
    if (isAlreadyAdded(item.name) || isVotingClosed) return;

    // ส่งทั้งชื่อ ราคา และ URL รูปภาพเข้าสู่ระบบโหวต
    onAddMenu({
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="space-y-6 text-left">
      {/* แบนเนอร์แจ้งเตือนหากปิดโหวตอยู่ */}
      {isVotingClosed && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3.5 text-xs sm:text-sm flex items-center gap-2">
          <span>🔒</span>
          <span>ขณะนี้ระบบปิดโหวตแล้ว ไม่สามารถเพิ่มเมนูแนะนำเข้าสู่รายการโหวตได้</span>
        </div>
      )}

      {/* หัวข้อหน้าและตัวกรอง */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">✨ รายการอาหารแนะนำ</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              คิดไม่ออกว่าจะกินอะไร? กดเลือกเมนูยอดฮิตพร้อมรูปภาพด้านล่างเพื่อส่งเข้าสู่กระดานโหวตได้ทันที
            </p>
          </div>

          <input
            type="text"
            placeholder="ค้นหาชื่อเมนูแนะนำ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 w-full sm:w-56"
          />
        </div>

        {/* ปุ่มกรองหมวดหมู่ */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ตารางแสดงการ์ดเมนูพร้อมรูปภาพ */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 text-center">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="text-sm font-semibold text-slate-700">ไม่พบเมนูแนะนำที่ค้นหา</p>
          <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่นดูนะครับ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const added = isAlreadyAdded(item.name);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:border-orange-300 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* ส่วนแสดงรูปภาพเมนูอาหาร */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* ป้ายหมวดหมู่มุมซ้ายบนของรูป */}
                    <span className="absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full shadow-sm">
                      {item.emoji} {item.category}
                    </span>
                    {/* ป้ายราคามุมขวาล่างของรูป */}
                    <span className="absolute bottom-3 right-3 text-xs font-bold px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-white rounded-lg">
                      ฿{item.price}
                    </span>
                  </div>

                  {/* ชื่อเมนู */}
                  <div className="p-4 pb-2">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* ปุ่มกดเพิ่มเข้าสู่รายการโหวต */}
                <div className="p-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAdd(item)}
                    disabled={added || isVotingClosed}
                    className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                      added
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                        : isVotingClosed
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm'
                    }`}
                  >
                    {added
                      ? '✓ อยู่ในรายการโหวตแล้ว'
                      : isVotingClosed
                      ? 'ปิดรับเมนูเพิ่ม'
                      : '+ เพิ่มเข้าสู่รายการโหวต'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}