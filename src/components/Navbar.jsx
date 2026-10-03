import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ currentView, onViewChange, menuCount }) {
  const navItems = [
    { id: 'MANAGE', label: 'จัดการเมนู', icon: '📝', count: menuCount },
    { id: 'VOTE_SUMMARY', label: 'ห้องโหวต & สรุปผล', icon: '🗳️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-150">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* โลโก้และชื่อเว็บ */}
        <div className="flex items-center gap-2.5">
          <span className="text-2xl p-1.5 bg-orange-100 rounded-xl">🍱</span>
          <div>
            <span className="font-extrabold text-slate-800 text-lg tracking-tight block leading-tight">
              กินไรดี?
            </span>
            <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
              Office Voting System
            </span>
          </div>
        </div>

        {/* แถบสลับแท็บเมนู */}
        <nav className="flex items-center bg-slate-100/80 p-1 rounded-xl">
          {navItems.map((item) => {
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 select-none ${
                  isActive ? 'text-orange-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {/* แถบพื้นหลัง Active ขยับได้ด้วย Framer Motion */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}

                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>

                {typeof item.count === 'number' && item.count > 0 && (
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}