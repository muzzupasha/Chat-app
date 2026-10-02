import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/userSlice';

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!selectedUser) return;

    const receiverId = selectedUser.id ?? selectedUser._id;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/message/${receiverId}`, {
          withCredentials: true,
        });
        console.log(res);
        
        const messages = res?.data?.data ?? [];
        dispatch(setMessages(messages));
      } catch (error) {
        if (error?.response?.status === 404) {
          dispatch(setMessages([]));
          return;
        }

        console.log(error);
      }
    };

    fetchMessages();
  }, [dispatch, selectedUser]);
};

export default useGetMessages;