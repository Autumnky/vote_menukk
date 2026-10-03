import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuList({ menus, onDeleteMenu }) {
  // เก็บ State สำหรับรูปภาพที่โหลดไม่ขึ้น (Broken Images)
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  if (!menus || menus.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
        <p className="text-4xl mb-2">🍽️</p>
        <p className="text-slate-500 font-medium">ยังไม่มีเมนูในระบบ</p>
        <p className="text-xs text-slate-400 mt-1">
          กรอกข้อมูลด้านบนเพื่อเริ่มเพิ่มเมนูเข้าสู่ระบบโหวต
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          รายการเมนูทั้งหมด ({menus.length})
        </h3>
      </div>

      <div className="grid gap-3">
        <AnimatePresence>
          {menus.map((menu) => {
            const isBroken = brokenImages[menu.id];
            const hasImage = Boolean(menu.imageUrl && !isBroken);

            return (
              <motion.div
                key={menu.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* กรอบแสดงรูปภาพ หรือ Fallback Icon */}
                  <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 overflow-hidden">
                    {hasImage ? (
                      <img
                        src={menu.imageUrl}
                        alt={menu.name}
                        onError={() => handleImageError(menu.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl select-none" role="img" aria-label="food-icon">
                        {menu.fallbackIcon || '🍲'}
                      </span>
                    )}
                  </div>

                  {/* ข้อมูลเมนู */}
                  <div className="min-w-0">
                    <h4 className="text-slate-800 font-semibold text-base truncate">
                      {menu.name}
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      ฿{menu.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ปุ่มลบเมนู */}
                <button
                  type="button"
                  onClick={() => onDeleteMenu(menu.id)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors ml-2 shrink-0"
                  title="ลบเมนูนี้"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}