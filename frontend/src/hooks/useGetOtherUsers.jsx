import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';
import { api } from '../utils/api';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchOtherUsers = async () => {
      try {
        const res = await api.get('/api/v1/user/getOtherUser', {
          withCredentials: true,
        });

        const users = res?.data?.otherUsers ?? [];
        dispatch(setOtherUsers(users));
      } catch (err) {
        console.error(err);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;