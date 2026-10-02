import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCheck, FiLock, FiMessageCircle, FiPlay, FiShield, FiUsers } from 'react-icons/fi';

const previewMessages = [
  { author: 'Aisha', text: 'The weekend plan is still on 🌿', time: '10:42', mine: false },
  { author: 'You', text: 'Absolutely. I found the perfect spot.', time: '10:43', mine: true },
  { author: 'Aisha', text: 'Perfect. See you there!', time: '10:43', mine: false },
];

const LandingPage = () => {
  return (
    <main className="landing-page relative h-full min-h-screen overflow-x-hidden overflow-y-auto bg-[#f4f8f5] text-[#10221d]">
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#b9e7c8]/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 -top-20 h-96 w-96 rounded-full bg-[#d4eee0] blur-3xl sm:-right-24" />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="ChatApp home">
          <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#168c63] text-white shadow-lg shadow-[#168c63]/20">
            <FiMessageCircle size={21} strokeWidth={2.5} />
          </span>
          <span className="text-lg font-black tracking-[-0.04em]">chatapp</span>
        </Link>

        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link className="hidden px-3 py-2 text-[#4d665d] transition hover:text-[#10221d] sm:block" to="/login">
            Log in
          </Link>
          <Link className="rounded-full bg-[#10221d] px-5 py-2.5 text-white shadow-lg shadow-[#10221d]/15 transition hover:-translate-y-0.5 hover:bg-[#168c63]" to="/signup">
            Get started
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div className="max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#b9ddc9] bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#168c63] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#35c58a]" />
            Conversations, made human
          </div>
          <h1 className="max-w-lg text-5xl font-black leading-[0.98] tracking-[-0.065em] text-[#10221d] sm:text-6xl lg:text-7xl">
            Stay close to the people who matter.
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#60766c] sm:text-lg">
            A calm, private place for your everyday conversations. Message friends, share the moment, and always pick up right where you left off.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#168c63] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#168c63]/20 transition hover:-translate-y-0.5 hover:bg-[#107451]" to="/signup">
              Start chatting
              <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} />
            </Link>
            <Link className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c8ddd1] bg-white/60 px-6 py-3.5 text-sm font-bold text-[#345248] transition hover:border-[#168c63] hover:bg-white" to="/login">
              <FiPlay size={14} fill="currentColor" />
              I have an account
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#6e847a]">
            <span className="inline-flex items-center gap-2"><FiLock size={14} className="text-[#168c63]" /> Private by default</span>
            <span className="inline-flex items-center gap-2"><FiCheck size={14} className="text-[#168c63]" /> Simple to use</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:pl-8">
          <div className="absolute -right-2 top-8 hidden rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-xl shadow-[#426c59]/10 backdrop-blur sm:block lg:-right-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#345248]"><span className="h-2 w-2 rounded-full bg-[#35c58a]" /> 3 friends online</div>
          </div>
          <div className="relative overflow-hidden rounded-[30px] border border-white/90 bg-[#e8f3eb] p-3 shadow-[0_35px_80px_-30px_rgba(27,85,61,0.42)] sm:p-5">
            <div className="absolute inset-x-12 top-0 h-20 rounded-full bg-white/50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[22px] border border-[#d5e8da] bg-[#f7fbf8] shadow-2xl shadow-[#426c59]/10">
              <div className="flex items-center justify-between border-b border-[#e1eee4] bg-white/90 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#e3b078] text-sm font-black text-[#5a3822]">A<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#35c58a]" /></div>
                  <div><p className="text-sm font-bold text-[#19372c]">Aisha Rahman</p><p className="text-[11px] font-medium text-[#77a08d]">online now</p></div>
                </div>
                <FiMessageCircle className="text-[#168c63]" size={20} />
              </div>
              <div className="space-y-4 bg-[linear-gradient(135deg,#f4faf5_25%,#eef7f0_25%,#eef7f0_50%,#f4faf5_50%,#f4faf5_75%,#eef7f0_75%)] bg-size-[28px_28px] px-4 py-7 sm:px-8 sm:py-10">
                <div className="mx-auto mb-5 w-fit rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8aa99a] shadow-sm">Today</div>
                {previewMessages.map((item) => (
                  <div key={`${item.author}-${item.time}`} className={`flex ${item.mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${item.mine ? 'rounded-br-md bg-[#d4f5df] text-[#194932]' : 'rounded-bl-md bg-white text-[#36564a]'}`}>
                      <p className="text-[11px] font-bold text-[#168c63]">{item.author}</p>
                      <p className="mt-1 text-sm leading-5">{item.text}</p>
                      <p className="mt-1 text-right text-[10px] font-medium text-[#8aa99a]">{item.time} <span className="text-[#168c63]">✓✓</span></p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-3 text-xs font-medium text-[#86a396]"><span className="flex gap-1 rounded-full bg-white px-3 py-2 shadow-sm"><i className="h-1.5 w-1.5 rounded-full bg-[#35c58a]" /><i className="h-1.5 w-1.5 rounded-full bg-[#35c58a]" /><i className="h-1.5 w-1.5 rounded-full bg-[#35c58a]" /></span>Aisha is typing...</div>
              </div>
              <div className="flex items-center gap-3 border-t border-[#e1eee4] bg-white px-4 py-3"><div className="h-10 flex-1 rounded-full bg-[#f0f6f1] px-4 py-3 text-xs text-[#9ab1a4]">Write a message...</div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#168c63] text-white"><FiArrowUpRight size={18} /></span></div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl shadow-[#426c59]/10 backdrop-blur sm:flex lg:-left-8"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f3e2] text-[#168c63]"><FiShield size={18} /></span><div><p className="text-xs font-bold text-[#345248]">Your space, your rules</p><p className="text-[10px] text-[#89a398]">Built for real connection</p></div></div>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-4 px-6 pb-12 sm:grid-cols-3 lg:px-10">
        {[
          [FiLock, 'Private conversations', 'Your chats stay personal and easy to manage.'],
          [FiUsers, 'People, not noise', 'Keep the important conversations close.'],
          [FiMessageCircle, 'Always in the flow', 'Pick up naturally across every conversation.'],
        ].map(([Icon, title, text]) => (
          <div key={title} className="border-t border-[#cfe3d5] px-1 pt-5 sm:px-4"><Icon className="mb-3 text-[#168c63]" size={20} /><h2 className="text-sm font-bold text-[#234437]">{title}</h2><p className="mt-1 text-xs leading-5 text-[#789187]">{text}</p></div>
        ))}
      </section>
    </main>
  );
};

export default LandingPage;
