import React, { useState } from "react";
import { FiPaperclip, FiSend, FiSmile } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";
import { api } from "../utils/api";


const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser, messages } = useSelector((store) => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const receiverId = selectedUser?.id ?? selectedUser?._id;

    if (!receiverId || !message.trim()) return;

    try {
      const res = await api.post(
        `/api/v1/message/send/${receiverId}`,
        { message },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      const sentMessage = res?.data?.newMessage;

      if (sentMessage) {
        dispatch(setMessages([...(messages ?? []), sentMessage]));
      }
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-2 rounded-2xl border border-white/10 bg-[#202c33] px-2 py-2 backdrop-blur-xl sm:mt-4 sm:rounded-[1.5rem] sm:px-3 sm:py-3"
    >
      <div className="flex min-w-0 items-center gap-1 sm:gap-3">
        <button
          type="button"
          className="hidden rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-300 sm:block"
          aria-label="Add attachment"
        >
          <FiPaperclip size={18} />
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none"
          placeholder="Type a message..."
        />

        <button
          type="button"
          className="hidden rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-emerald-300 sm:block"
          aria-label="Choose emoji"
        >
          <FiSmile size={18} />
        </button>

        <button
          type="submit"
          className="shrink-0 rounded-full bg-emerald-500 px-3 py-2 font-bold text-slate-950 shadow-lg shadow-emerald-950/40 transition hover:bg-emerald-400 sm:px-4"
          aria-label="Send message"
        >
          <span className="flex items-center gap-2">
            <FiSend size={16} />
            <span className="hidden sm:inline">Send</span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SendInput;
