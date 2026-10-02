import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/user/getOtherUser', {
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