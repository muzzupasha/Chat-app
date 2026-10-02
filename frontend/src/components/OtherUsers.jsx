import React from "react";
import {  useSelector } from "react-redux";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";


const OtherUsers = ({ search = "" }) => {
  useGetOtherUsers();
  const otherUsers = useSelector((state) => state.user?.otherUsers ?? []);
  const onlineUsers = useSelector((state) => state.user?.onlineUsers ?? []);
  const normalizedSearch = search.trim().toLowerCase();
  const filteredUsers = otherUsers.filter((user) => {
    if (!normalizedSearch) return true;

    return String(user.fullName ?? "")
      .toLowerCase()
      .includes(normalizedSearch);
  });


  if (!otherUsers) return; // Early return in react

  return (
    <div className="max-h-[calc(100dvh-255px)] space-y-2 overflow-y-auto pr-1 sm:max-h-[calc(100dvh-280px)]">
      {filteredUsers.map((user) => (
        <OtherUser
          key={user._id}
          conversation={{
            id: user._id,
            name: user.fullName,
            lastMessage: "Say hello 👋",
            time: "Now",
            unread: 0,
            online: onlineUsers.some(
              (onlineUserId) => String(onlineUserId) === String(user._id),
            ),
            avatar: user.profilePhoto,
          }}
        />
      ))}
    </div>
  );
};

export default OtherUsers;
