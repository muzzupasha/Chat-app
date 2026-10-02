const normalizeConversationId = (conversation) => conversation?.id ?? conversation?._id;

const isSameConversation = (selectedUser, conversation) => {
  const selectedId = normalizeConversationId(selectedUser);
  const currentId = normalizeConversationId(conversation);

  return Boolean(selectedId && currentId && selectedId === currentId);
};

module.exports = {
  isSameConversation,
};
