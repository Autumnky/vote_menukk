import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFoodVoteStorage } from './hooks/useFoodVoteStorage';
import Navbar from './components/Navbar';
import ManageView from './views/ManageView';
import VoteSummaryView from './views/VoteSummaryView';

export default function App() {
  const { menus, userVote, addMenu, deleteMenu, toggleVote } = useFoodVoteStorage();
  
  // จัดการแท็บหน้าปัจจุบัน: 'MANAGE' หรือ 'VOTE_SUMMARY'
  const [currentView, setCurrentView] = useState(() => {
    // ถ้าเคยมีเมนูค้างอยู่ในระบบอยู่แล้ว ให้เปิดเข้าหน้าห้องโหวตก่อนได้เลย
    return menus.length > 0 ? 'VOTE_SUMMARY' : 'MANAGE';
  });

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      {/* ส่วนแถบเมนูด้านบน */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        menuCount={menus.length}
      />

      {/* พื้นที่แสดงผลหลักพร้อม Page Transition */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'MANAGE' ? (
            <ManageView
              key="view-manage"
              menus={menus}
              onAddMenu={addMenu}
              onDeleteMenu={deleteMenu}
              onGoToVote={() => setCurrentView('VOTE_SUMMARY')}
            />
          ) : (
            <VoteSummaryView
              key="view-vote"
              menus={menus}
              userVote={userVote}
              onToggleVote={toggleVote}
              onGoToManage={() => setCurrentView('MANAGE')}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer เรียบง่าย */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-150">
        Food & Drink Voting System • Local Storage Mode
      </footer>
    </div>
  );
}