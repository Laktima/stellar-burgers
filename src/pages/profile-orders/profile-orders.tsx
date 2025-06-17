import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserOrders, fetchGetOrders } from '../../slices/feedSlice';
import { fetchIngredients } from '../../slices/ingredientsSilce';

export const ProfileOrders: FC = () => {
  const orders = useSelector<TOrder[]>(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
