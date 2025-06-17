import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from '../../services/store';
import { TUser } from '@utils-types';

export const AppHeader: FC = () => {
  const user = useSelector<TUser | null>(selectUser);

  return <AppHeaderUI userName={user?.name ?? ''} />;
};
