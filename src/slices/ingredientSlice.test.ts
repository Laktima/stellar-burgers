import reducer, {
    selectIngredients,
    selectIsLoading,
    selectSelectedIngredient,
    fetchIngredients,
    selectIngredientDetails,
  } from './ingredientsSilce';
  import { TIngredient } from '../utils/types';
  
  describe('ingredientsSlice', () => {
    const initialState = {
      ingredients: [],
      selectedIngredient: null,
      isLoading: true,
    };
  
    it('должен иметь правильную начальную инициализацию', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    describe('extraReducers', () => {
      it('обрабатывает fetchIngredients.pending', () => {
        const state = reducer(initialState, fetchIngredients.pending('', undefined));
        expect(state.isLoading).toBe(true);
      });
  
      it('проверяем fetchIngredients.rejected', () => {
        const state = reducer({ ...initialState, isLoading: true }, fetchIngredients.rejected(new Error(), '', undefined));
        expect(state.isLoading).toBe(false);
      });
  
      it('проверяем fetchIngredients.fulfilled', () => {
        const payload: TIngredient[] = [
            {
                _id: '1',
                name: 'banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            },
            {
                _id: '2',
                name: 'not banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            },
        ];
        const state = reducer(initialState, fetchIngredients.fulfilled(payload, '', undefined));
        expect(state.isLoading).toBe(false);
        expect(state.ingredients).toEqual(payload);
      });
    });
  
    describe('reducers', () => {
      it('проверка selectIngredientDetails - выбирает правильный ингредиент по _id', () => {
        const ingredientsSample: TIngredient[] = [
            {
                _id: '1',
                name: 'banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            },
            {
                _id: '2',
                name: 'not banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            },
        ];
        
        const state = { ...initialState, ingredients: ingredientsSample };
        
        const newState1 = reducer(state, selectIngredientDetails('1'));
        expect(newState1.selectedIngredient).toEqual({
            _id: '1',
            name: 'banana',
            type: 'ingredient',
            proteins: 10,
            fat: 20,
            carbohydrates: 15,
            calories: 220,
            price: 100,
            image: 'string',
            image_large: 'string',
            image_mobile: 'string',
        });
        
        const newState2 = reducer(state, selectIngredientDetails('unknown'));
        expect(newState2.selectedIngredient).toBeNull();
      });
    });
  
    describe('селекторы', () => {
      const testState = {
        ingredients: {
            ingredients: [{
                _id: '1',
                name: 'banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            }],
            selectedIngredient: {
                _id: '1',
                name: 'banana',
                type: 'ingredient',
                proteins: 10,
                fat: 20,
                carbohydrates: 15,
                calories: 220,
                price: 100,
                image: 'string',
                image_large: 'string',
                image_mobile: 'string',
            },
            isLoading: false,
        }
      };
  
      it('selectIngredients - возвращает список ингредиентов', () => {
        expect(selectIngredients(testState)).toEqual(testState.ingredients.ingredients);
      });
      
      it('selectIsLoading - возвращает isLoading', () => {
        expect(selectIsLoading(testState)).toBe(false);
      });
      
      it('selectSelectedIngredient - возвращает выбранный ингредиент', () => {
        expect(selectSelectedIngredient(testState)).toEqual({_id: '1',
        name: 'banana',
        type: 'ingredient',
        proteins: 10,
        fat: 20,
        carbohydrates: 15,
        calories: 220,
        price: 100,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',});
      });
    });
  });