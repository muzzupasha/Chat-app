import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SendInput from "./SendInput";
import Messages from "./Messages";
import {
  FiMessageCircle,
  FiMoreVertical,
  FiPhone,
  FiArrowLeft,
  FiSearch,
  FiVideo,
} from "react-icons/fi";
import { setSelectedUser } from "../redux/userSlice";
import useGetMessages from "../hooks/useGetMessages"

const MessageContainer = ({ className = '' }) => {
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const selectedUserId = selectedUser?.id ?? selectedUser?._id;
  const isSelectedUserOnline = onlineUsers.some(
    (onlineUserId) => String(onlineUserId) === String(selectedUserId),
  );
  useGetMessages();
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    selectedUser?.name ?? "Chat user",
  )}&background=0f766e&color=fff`;

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);

  if (!selectedUser) {
    return (
      <section
        className={`${className} h-full min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-[#0b141a] p-4 text-slate-50 md:p-6`}
        style={{
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(134, 150, 160, 0.08) 2px, transparent 2px), radial-gradient(circle at 75px 75px, rgba(134, 150, 160, 0.05) 2px, transparent 2px)",
          backgroundSize: "100px 100px",
        }}
      >
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-400/10 text-emerald-300 shadow-2xl shadow-emerald-950/40">
            <FiMessageCircle size={38} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
            Welcome, {authUser?.fullName ?? "there"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Choose a conversation from the sidebar to start chatting.
          </p>
          <div className="mt-8 h-px w-28 bg-emerald-400/40" />
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            Your messages are private
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${className} h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#111b21] p-2 text-slate-50 sm:p-4 md:p-6`}>
      <header className="flex min-w-0 items-center justify-between gap-2 rounded-2xl border border-white/8 bg-[#202c33] px-3 py-3 backdrop-blur-sm sm:rounded-[1.4rem] sm:px-4 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => dispatch(setSelectedUser(null))}
            className="shrink-0 rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 md:hidden"
            aria-label="Back to conversations"
          >
            <FiArrowLeft size={18} />
          </button>
          <img
            className="h-10 w-10 shrink-0 rounded-full border border-emerald-300/40 object-cover sm:h-12 sm:w-12"
            src={selectedUser?.avatar ?? fallbackAvatar}
            alt={selectedUser?.name ?? "Chat user"}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackAvatar;
            }}
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <span className="max-w-[42vw] truncate text-sm font-bold text-slate-50 sm:max-w-none sm:text-base">
                {selectedUser?.name ?? "Select a chat"}
              </span>
              {isSelectedUserOnline && (
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              )}
            </div>
            <span className="text-xs text-slate-400">
              {isSelectedUserOnline ? "online now" : "offline"}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            className="hidden rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-emerald-300 hover:text-slate-950 sm:block sm:p-2.5"
            aria-label="Call"
          >
            <FiPhone size={17} />
          </button>
          <button
            className="hidden rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-emerald-300 hover:text-slate-950 sm:block sm:p-2.5"
            aria-label="Video call"
          >
            <FiVideo size={17} />
          </button>
          <button
            className="hidden rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-emerald-300 hover:text-slate-950 sm:block sm:p-2.5"
            aria-label="Search conversation"
          >
            <FiSearch size={17} />
          </button>
          <button
            className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-emerald-300 hover:text-slate-950 sm:p-2.5"
            aria-label="More options"
          >
            <FiMoreVertical size={17} />
          </button>
        </div>
      </header>

      <Messages />
      <SendInput />
    </section>
  );
};

export default MessageContainer;
