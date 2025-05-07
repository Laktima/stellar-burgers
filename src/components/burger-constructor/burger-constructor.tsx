import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectIngredients,
  selectBun,
  fetchOrderBurgerApi,
  selectLastOrder,
  selectIsLoading,
  clearOrder
} from '../../slices/basketSlice';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector<TIngredient[]>(selectIngredients);
  const bun = useSelector<TIngredient | null>(selectBun);
  const isLoading = useSelector<boolean>(selectIsLoading);
  const lastOrder = useSelector<TOrder | null>(selectLastOrder);
  const constructorItems = {
    bun,
    ingredients
  };

  const orderRequest = isLoading;

  const orderModalData = lastOrder;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!getCookie('accessToken')) navigate('/login', { replace: true });
    dispatch(
      fetchOrderBurgerApi([
        ...ingredients.map((ingredient) => ingredient._id),
        bun?._id ?? ''
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
