import React from 'react';
import { motion } from 'framer-motion';
import VotingGrid from '../components/VotingGrid';
import LiveLeaderboard from '../components/LiveLeaderboard';

export default function VoteSummaryView({
  menus,
  currentSelectedId,
  isVotingClosed,
  onSelectMenu,
  onConfirmNext,
  onToggleVotingStatus,
  onResetVotes,
  onGoToManage,
}) {
  if (!menus || menus.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-6 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <span className="text-5xl block">📭</span>
        <h2 className="text-xl font-bold text-slate-800">ยังไม่มีรายการอาหาร</h2>
        <button
          onClick={onGoToManage}
          className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-xl text-sm"
        >
          ➕ เพิ่มเมนูก่อนเริ่มโหวต
        </button>
      </div>
    );
  }

  // หาเมนูที่ได้คะแนนสูงสุด
  const sorted = [...menus].sort((a, b) => b.votes - a.votes);
  const winner = sorted[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* ส่วนควบคุมสถานะการโหวต */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-800">ห้องโหวตกลาง</h1>
          <p className="text-sm text-slate-500">
            เลือกเมนูของตัวเอง กดยืนยัน แล้วส่งมือถือให้เพื่อนคนถัดไปได้เลย
          </p>
        </div>

        {/* ปุ่มควบคุม (ปิดโหวต / รีเซ็ต) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleVotingStatus}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isVotingClosed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            {isVotingClosed ? '🔓 เปิดรับโหวตใหม่' : '🔒 ปิดรับโหวตเดี๋ยวนี้'}
          </button>

          <button
            type="button"
            onClick={onResetVotes}
            className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            title="ล้างคะแนนทั้งหมดเป็น 0"
          >
            🔄 รีเซ็ตคะแนน
          </button>
        </div>
      </div>

      {/* Banner ประกาศผลชนะเลิศเมื่อปิดโหวต */}
      {isVotingClosed && winner && winner.votes > 0 && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl shadow-lg text-center space-y-2"
        >
          <span className="text-4xl block">🎉 🏆 🎉</span>
          <h2 className="text-2xl font-black">มติเอกฉันท์! มื้อนี้เรากิน</h2>
          <p className="text-3xl font-extrabold underline decoration-white/50 underline-offset-4">
            {winner.name}
          </p>
          <p className="text-sm text-orange-100 font-medium">
            คว้าชัยชนะไปด้วยคะแนนทั้งหมด {winner.votes} เสียง (ราคาเฉลี่ย ~฿{winner.price})
          </p>
        </motion.div>
      )}

      {/* สรุปคะแนนสด */}
      <LiveLeaderboard menus={menus} />

      {/* การ์ดกดโหวต */}
      <VotingGrid
        menus={menus}
        currentSelectedId={currentSelectedId}
        isVotingClosed={isVotingClosed}
        onSelectMenu={onSelectMenu}
        onConfirmNext={onConfirmNext}
      />
    </motion.div>
  );
}