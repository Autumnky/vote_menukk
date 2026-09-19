import React from 'react';
import { motion } from 'framer-motion';
import VotingGrid from '../components/VotingGrid';
import LiveLeaderboard from '../components/LiveLeaderboard';

export default function VoteSummaryView({ menus, userVote, onToggleVote, onGoToManage }) {
  // Edge case: ยังไม่มีเมนูเปิดให้โหวต
  if (!menus || menus.length === 0) {
    return (
      <motion.div
        key="empty-vote-view"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4"
      >
        <span className="text-5xl block" role="img" aria-label="empty">
          📭
        </span>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800">
            ยังไม่มีรายการให้เปิดโหวต
          </h2>
          <p className="text-sm text-slate-500">
            ไปที่หน้าจัดการเมนูเพื่อเพิ่มตัวเลือกอาหารหรือเครื่องดื่มก่อนเริ่มโหวต
          </p>
        </div>
        <button
          type="button"
          onClick={onGoToManage}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold rounded-xl shadow-sm shadow-orange-500/20 text-sm transition-all"
        >
          <span>➕</span> เพิ่มเมนูแรกเลย
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="vote-summary-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* ส่วนหัวของหน้าโหวต */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">
            ห้องโหวต & สรุปผลเรียลไทม์
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            คลิกที่การ์ดเพื่อโหวต (กดซ้ำเพื่อยกเลิก หรือคลิกเมนูอื่นเพื่อเปลี่ยนโหวต)
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToManage}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-sm font-semibold rounded-xl transition-all shrink-0"
        >
          <span>⚙️</span> จัดการเมนูเพิ่มเติม
        </button>
      </div>

      {/* แดชบอร์ดสรุปผลสด (Leaderboard) */}
      <LiveLeaderboard menus={menus} />

      {/* ตะแกรงการ์ดเปิดโหวต (Voting Grid) */}
      <VotingGrid
        menus={menus}
        userVote={userVote}
        onToggleVote={onToggleVote}
      />
    </motion.div>
  );
}