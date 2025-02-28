import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function LogoutBtn({ setPosts }) {  // Accept setPosts as a prop
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      setPosts([]); // Clear posts on logout
    });
  };

  return (
    <button
      className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-smooth"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
