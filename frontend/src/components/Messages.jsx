import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetRealTimeMessage()
  const messages = useSelector((store) => store.user.messages ?? []);
  const messagesContainer = useRef(null);

  useEffect(() => {
    const container = messagesContainer.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  if (!messages) return null;

  return (
    <section
      ref={messagesContainer}
      className="min-h-0 min-w-0 flex-1 overscroll-contain overflow-y-auto overflow-x-hidden px-1 py-4 sm:px-2 sm:py-6"
    >
      <div className="space-y-4">
        {messages.filter(Boolean).map((message) => (
          <Message key={message._id ?? message.id} message={message} />
        ))}
      </div>
    </section>
  );
};

export default Messages;