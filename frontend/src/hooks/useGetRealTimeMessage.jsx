import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/userSlice";
import { getActiveSocket } from "../utils/socket";

const useGetRealTimeMessage = () => {
  const { socket, messages } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const messagesRef = useRef(messages);

  messagesRef.current = messages;

  useEffect(() => {
    const activeSocket = getActiveSocket();
    if (!socket || !activeSocket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setMessages([...(messagesRef.current ?? []), newMessage]));
    };

    activeSocket.on("newMessage", handleNewMessage);
    return () => activeSocket.off("newMessage", handleNewMessage);
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
