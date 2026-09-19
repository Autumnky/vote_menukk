import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function VotingGrid({ menus, userVote, onToggleVote }) {
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  if (!menus || menus.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>🍽️</span> เลือกเมนูที่คุณอยากกินวันนี้
        </h3>
        <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
          {userVote ? 'โหวตแล้ว 1 เมนู (กดซ้ำเพื่อยกเลิก)' : 'ยังไม่ได้ลงคะแนน'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu) => {
          const isSelected = userVote === menu.id;
          const isBroken = brokenImages[menu.id];
          const hasImage = Boolean(menu.imageUrl && !isBroken);

          return (
            <motion.div
              key={menu.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggleVote(menu.id)}
              className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200 border-2 flex flex-col justify-between overflow-hidden select-none ${
                isSelected
                  ? 'border-orange-500 bg-orange-50/40 shadow-md shadow-orange-500/10'
                  : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
              }`}
            >
              {/* Badge แสดงสถานะว่าถูกเลือกอยู่ */}
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span>✓</span> เลือกอยู่
                </div>
              )}

              {/* ส่วนรูปภาพ / Fallback Icon */}
              <div className="w-full h-40 rounded-xl bg-slate-100 mb-3 overflow-hidden flex items-center justify-center border border-slate-100">
                {hasImage ? (
                  <img
                    src={menu.imageUrl}
                    alt={menu.name}
                    onError={() => handleImageError(menu.id)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <span className="text-5xl" role="img" aria-label="food-icon">
                    {menu.fallbackIcon || '🍲'}
                  </span>
                )}
              </div>

              {/* ข้อมูลเมนูและราคา */}
              <div className="space-y-1 mb-3">
                <h4 className="font-bold text-slate-800 text-lg leading-snug line-clamp-1">
                  {menu.name}
                </h4>
                <p className="text-orange-600 font-bold text-sm">
                  ฿{menu.price.toLocaleString()}
                </p>
              </div>

              {/* ปุ่ม Action ประจำการ์ด */}
              <button
                type="button"
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isSelected ? 'กดยกเลิกโหวต' : 'โหวตเมนูนี้'}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}