import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';
import {
  selectSelectedIngredient,
  fetchIngredients,
  selectIngredientDetails,
  selectIngredients
} from '../../slices/ingredientsSilce';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ingredientData = useSelector<TIngredient | null>(
    selectSelectedIngredient
  );
  const ingredients = useSelector<TIngredient[]>(selectIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  useEffect(() => {
    if (id) dispatch(selectIngredientDetails(id));
  }, [id, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
