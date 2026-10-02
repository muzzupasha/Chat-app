import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ conversation }) => {

  const dispatch = useDispatch();
  const { selectedUser , onlineUsers} = useSelector((store) => store.user);
  const selectedId = selectedUser?.id ?? selectedUser?._id;
  const conversationId = conversation?.id ?? conversation?._id;
  const isSelected = Boolean(
    selectedId && conversationId && String(selectedId) === String(conversationId),
  );

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    conversation.name ?? "User",
  )}&background=0f766e&color=fff`;

  const isOnline = onlineUsers.some((userId) => String(userId) === String(conversationId));

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(conversation));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`${isSelected ? 'bg-bg-white border-cyan-300/30 shadow-lg' : ''} group flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 py-3 transition duration-300 hover:bg-white/8 hover:border-cyan-300/30 hover:shadow-lg`}
    >
      <div className="relative">
        <img
          className="h-11 w-11 rounded-full object-cover"
          src={conversation.avatar ?? fallbackAvatar}
          alt={conversation.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackAvatar;
          }}
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-slate-300">{conversation.name}</span>
          <span className="text-[11px] text-slate-500">{conversation.time}</span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="truncate text-xs text-slate-500">{conversation.lastMessage}</span>
          {conversation.unread > 0 && (
            <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-bold text-slate-950">
              {conversation.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUser;