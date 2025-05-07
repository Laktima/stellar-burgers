import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectUser, fetchUser } from '../../slices/userSlice';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getCookie('accessToken');
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser());
    }
  }, [accessToken]);

  if (!accessToken) return <Navigate to='/login' />;

  return children;
};
