import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import { setAuthUser, setOnlineUsers, setSocket } from './redux/userSlice';
import { setActiveSocket } from './utils/socket';
import { api, API_URL } from './utils/api';

function App() {
   const { authUser } = useSelector((store) => store.user);
   const dispatch = useDispatch()
  const [authChecked, setAuthChecked] = useState(false);
   const authUserId = authUser?.userId ?? authUser?._id ?? authUser?.id;

   useEffect(() => {
     dispatch(setOnlineUsers([]));

    api.get('/api/v1/user/me')
       .then((response) => dispatch(setAuthUser(response.data)))
       .catch(() => dispatch(setAuthUser(null)))
       .finally(() => setAuthChecked(true));
   }, [dispatch]);

   useEffect(() => {
     if (authUserId) {
          const socket = io(API_URL,{
             query:{
          userId:authUserId
             }
          })
         setActiveSocket(socket);
         dispatch(setSocket(true))
         socket.on('getOnlineUsers', (onlineUsers)=>{
            dispatch(setOnlineUsers(onlineUsers))
         })
        return ()=> {
          socket.off('getOnlineUsers');
          socket.close();
          setActiveSocket(null);
          dispatch(setSocket(false));
        };
       }
  }, [authUserId])
   
  return (
    <div className="app-viewport w-full overflow-hidden">
      {!authChecked ? (
        <div className="flex h-full items-center justify-center bg-[#f4f8f5] text-sm font-semibold text-[#168c63]">Loading your space...</div>
      ) : (
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      )}
    </div>
  );
}

export default App;