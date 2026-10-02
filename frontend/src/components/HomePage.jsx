import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';

const HomePage = () => {
  const selectedUser = useSelector((store) => store.user.selectedUser);

  return (
    <main className="app-viewport relative w-full overflow-hidden bg-[#111b21] text-slate-900">
      <div className="absolute -left-20 top-[-70px] h-72 w-72 rounded-full bg-emerald-900/40 blur-3xl" />
      <div className="absolute right-[-80px] bottom-[-100px] h-80 w-80 rounded-full bg-emerald-700/30 blur-3xl" />

      <section className="relative flex h-full w-full items-stretch overflow-hidden rounded-none border border-white/10 shadow-[0_30px_120px_-30px_rgba(15,23,42,0.55)]">
        <div className="flex h-full min-h-0 w-full flex-row">
          <Sidebar className={selectedUser ? 'hidden md:flex' : 'flex'} />
          <MessageContainer className={selectedUser ? 'flex' : 'hidden md:flex'} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;