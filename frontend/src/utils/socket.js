let activeSocket = null;

export const getActiveSocket = () => activeSocket;

export const setActiveSocket = (socket) => {
  activeSocket = socket;
};
