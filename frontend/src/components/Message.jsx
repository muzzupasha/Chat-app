import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [message]);

  const { authUser } = useSelector((store) => store.user);
  const currentUserId = authUser?.userId ?? authUser?._id ?? authUser?.id;
  const senderId =
    message.senderId?._id ?? message.senderId?.id ?? message.senderId;
  const isSent = String(senderId) === String(currentUserId);
  const messageText = message.message ?? message.text ?? "";
  const messageTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : (message.time ?? "");

  return (
    <div
      ref={scroll}
      className={`flex ${isSent ? "justify-end" : "justify-start"}`}
    >
      {!isSent && (
        <img
          className="mr-2 h-8 w-8 rounded-full object-cover"
          src="https://img.daisyui.com/images/profile/demo/albert@192.webp"
          alt=""
        />
      )}

      <div className={`min-w-0 max-w-[88%] sm:max-w-[75%] ${isSent ? "items-end" : "items-start"}`}>
        <div
          className={`break-words rounded-[1.2rem] px-3 py-2.5 text-sm leading-6 shadow-xl sm:rounded-[1.4rem] sm:px-4 sm:py-3 ${
            isSent
              ? "rounded-br-md border border-emerald-300/40 bg-[#005c4b] text-slate-50"
              : "rounded-bl-md border border-white/10 bg-[#202c33] text-slate-100"
          }`}
        >
          {messageText}
        </div>
        <span
          className={`mt-1 block text-[11px] ${isSent ? "text-right text-slate-500" : "text-left text-slate-500"}`}
        >
          {messageTime}
        </span>
      </div>
    </div>
  );
};

export default Message;
