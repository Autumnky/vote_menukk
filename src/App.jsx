import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useFoodVoteStorage } from './hooks/useFoodVoteStorage';
import Navbar from './components/Navbar';
import ManageView from './views/ManageView';
import VoteSummaryView from './views/VoteSummaryView';

export default function App() {
  const {
    menus,
    isVotingClosed,
    currentSelectedId,
    addMenu,
    deleteMenu,
    selectMenuForCurrentPerson,
    confirmAndNextVoter,
    toggleVotingStatus,
    resetAllVotes,
  } = useFoodVoteStorage();

  const [currentView, setCurrentView] = useState(() =>
    menus.length > 0 ? 'VOTE_SUMMARY' : 'MANAGE'
  );

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col font-sans antialiased selection:bg-orange-100 selection:text-orange-900">
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        menuCount={menus.length}
      />

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
              currentSelectedId={currentSelectedId}
              isVotingClosed={isVotingClosed}
              onSelectMenu={selectMenuForCurrentPerson}
              onConfirmNext={confirmAndNextVoter}
              onToggleVotingStatus={toggleVotingStatus}
              onResetVotes={resetAllVotes}
              onGoToManage={() => setCurrentView('MANAGE')}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-150">
        Food & Drink Voting System • Pass-Around Mode
      </footer>
    </div>
  );
}