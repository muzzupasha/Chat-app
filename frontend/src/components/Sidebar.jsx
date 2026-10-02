import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtherUsers from "./OtherUsers";
import { FiLogOut, FiSearch, FiSettings } from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";

const Sidebar = ({ className = '' }) => {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const authUser = useSelector((store) => store.user.authUser);
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    authUser?.fullName ?? "User",
  )}&background=0f766e&color=fff`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/Logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    setSearchQuery(search.trim());
  };

  return (
    <aside className={`${className} h-full min-h-0 w-full min-w-0 flex-col overflow-y-auto border-b border-white/10 bg-[#202c33] p-4 text-slate-100 backdrop-blur-xl sm:p-5 md:w-[320px] md:flex-none md:border-b-0 md:border-r md:p-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-900/20">
            <IoChatbubblesOutline size={22} />
          </span>
          <span className="text-xl font-bold tracking-[0.14em] text-slate-50">
            CHATAPP
          </span>
        </div>
        <button
          className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-emerald-300"
          aria-label="Open settings"
        >
          <FiSettings size={17} />
        </button>
      </div>

      <section className="mt-5 flex min-w-0 items-center gap-3 rounded-2xl border border-white/8 bg-[#111b21] p-3 sm:mt-8 sm:gap-4 sm:rounded-3xl sm:p-4">
        <div className="relative">
          <img
            className="h-12 w-12 shrink-0 rounded-full border-2 border-emerald-300/70 object-cover shadow-lg shadow-emerald-900/20 sm:h-14 sm:w-14"
            src={authUser?.profilePhoto ?? fallbackAvatar}
            alt={authUser?.fullName ?? "current user"}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackAvatar;
            }}
          />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#202c33] bg-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold text-slate-50">
              {authUser?.fullName ?? "Loading..."}
            </span>
            <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
              Online
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Product Design</p>
        </div>
      </section>

      <form onSubmit={searchSubmitHandler} className="mt-4 sm:mt-6">
        <label className="relative block">
          <span className="sr-only">Search conversations</span>
          <button
            type="submit"
            aria-label="Search users"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 p-1 text-slate-400 transition hover:text-emerald-300"
          >
            <FiSearch size={16} />
          </button>
          <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#111b21] py-3 pl-11 pr-4 text-sm text-slate-50 placeholder:text-slate-500 outline-none transition focus:border-emerald-300/60 focus:bg-[#172126] focus:ring-2 focus:ring-emerald-300/30"
            type="text"
            placeholder="Search conversations..."
          />
        </label>
      </form>

      <section className="mt-4 sm:mt-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Messages
          </span>
          <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] font-semibold text-slate-400">
            08
          </span>
        </div>
        <OtherUsers search={searchQuery} />
      </section>

      <div className="mt-6 border-t border-white/10 pt-4">
        <button
          onClick={logoutHandler}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-[#111b21] hover:text-emerald-300"
        >
          <FiLogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
