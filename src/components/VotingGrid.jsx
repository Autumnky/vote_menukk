import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VotingGrid({
  menus,
  currentSelectedId,
  isVotingClosed,
  onSelectMenu,
  onConfirmNext,
}) {
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }));
  };

  const selectedMenu = menus.find((m) => m.id === currentSelectedId);

  return (
    <div className="space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span>🍽️</span> {isVotingClosed ? 'การโหวตสิ้นสุดแล้ว' : 'แตะเพื่อเลือกเมนูของคุณ'}
        </h3>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            isVotingClosed
              ? 'bg-rose-100 text-rose-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {isVotingClosed ? '🔒 ปิดรับโหวตแล้ว' : '🟢 กำลังเปิดรับโหวต'}
        </span>
      </div>

      {/* Grid การ์ดอาหาร */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map((menu) => {
          const isSelected = currentSelectedId === menu.id;
          const isBroken = brokenImages[menu.id];
          const hasImage = Boolean(menu.imageUrl && !isBroken);

          return (
            <motion.div
              key={menu.id}
              whileHover={!isVotingClosed ? { y: -4 } : {}}
              whileTap={!isVotingClosed ? { scale: 0.98 } : {}}
              onClick={() => !isVotingClosed && onSelectMenu(menu.id)}
              className={`relative rounded-2xl p-4 transition-all duration-200 border-2 flex flex-col justify-between overflow-hidden select-none ${
                isVotingClosed
                  ? 'opacity-80 bg-slate-50 border-slate-200 cursor-not-allowed'
                  : isSelected
                  ? 'border-orange-500 bg-orange-50/50 shadow-md ring-2 ring-orange-400/20 cursor-pointer'
                  : 'border-slate-150 bg-white hover:border-slate-300 shadow-sm cursor-pointer'
              }`}
            >
              {isSelected && !isVotingClosed && (
                <div className="absolute top-3 right-3 z-10 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span>✓</span> กำลังเลือก
                </div>
              )}

              <div className="w-full h-36 rounded-xl bg-slate-100 mb-3 overflow-hidden flex items-center justify-center border border-slate-100">
                {hasImage ? (
                  <img
                    src={menu.imageUrl}
                    alt={menu.name}
                    onError={() => handleImageError(menu.id)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-5xl" role="img" aria-label="food-icon">
                    {menu.fallbackIcon || '🍲'}
                  </span>
                )}
              </div>

              <div className="space-y-1 mb-2">
                <h4 className="font-bold text-slate-800 text-base line-clamp-1">
                  {menu.name}
                </h4>
                <p className="text-orange-600 font-bold text-sm">
                  ฿{menu.price.toLocaleString()}
                </p>
              </div>

              <div
                className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-colors ${
                  isVotingClosed
                    ? 'bg-slate-200 text-slate-500'
                    : isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isVotingClosed
                  ? 'ปิดรับโหวต'
                  : isSelected
                  ? 'แตะอีกครั้งเพื่อยกเลิก'
                  : 'แตะเพื่อเลือก'}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* แถบแจ้งเตือนด้านล่างสำหรับส่งต่อให้คนถัดไป (Floating Action Bar) */}
      <AnimatePresence>
        {selectedMenu && !isVotingClosed && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 inset-x-4 max-w-lg mx-auto bg-slate-900/95 backdrop-blur text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 z-50 border border-slate-700"
          >
            <div className="min-w-0">
              <span className="text-xs text-orange-400 block font-medium">คุณกำลังเลือก:</span>
              <p className="font-bold truncate text-sm">{selectedMenu.name}</p>
            </div>

            <button
              type="button"
              onClick={onConfirmNext}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5"
            >
              <span>ยืนยัน & ส่งต่อ</span>
              <span>➡️</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}