import React from 'react';
import { motion } from 'framer-motion';

export default function LiveLeaderboard({ menus }) {
  if (!menus || menus.length === 0) return null;

  // คำนวณคะแนนรวมทั้งหมด
  const totalVotes = menus.reduce((sum, item) => sum + item.votes, 0);

  // เรียงลำดับเมนูตามคะแนนจากมากไปน้อย
  const sortedMenus = [...menus].sort((a, b) => b.votes - a.votes);
  const highestVote = sortedMenus[0]?.votes || 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>📊</span> ผลคะแนนโหวตแบบสด
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            อัปเดตอัตโนมัติเมื่อมีการลงคะแนนหรือเปลี่ยนใจ
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-orange-500">
            {totalVotes}
          </span>
          <span className="text-xs text-slate-500 block font-medium">คะแนนรวม</span>
        </div>
      </div>

      <div className="space-y-4">
        {sortedMenus.map((menu, index) => {
          // คำนวณเปอร์เซ็นต์ความกว้างของหลอดคะแนน
          const percentage = totalVotes > 0 ? Math.round((menu.votes / totalVotes) * 100) : 0;
          const isLeader = menu.votes > 0 && menu.votes === highestVote;

          return (
            <div key={menu.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xs font-bold w-5 text-slate-400">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-slate-800 truncate">
                    {menu.name}
                  </span>
                  {isLeader && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full shrink-0 flex items-center gap-1">
                      <span>👑</span> ผู้นำ
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <span className="text-xs text-slate-400 font-medium">
                    {percentage}%
                  </span>
                  <span className="text-sm font-bold text-slate-700 min-w-10 text-right">
                    {menu.votes} โหวต
                  </span>
                </div>
              </div>

              {/* เส้น Animated Progress Bar */}
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`h-full rounded-full ${
                    isLeader
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-slate-300'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}