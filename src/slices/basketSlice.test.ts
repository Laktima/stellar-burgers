import reducer, {
    addIngredients,
    moveUpIngredient,
    moveDownIngredient,
    clearOrder,
    deleteIngredient,
  } from './basketSlice';
  
  describe('basketSlice', () => {
    const initialState = {
      ingredients: [],
      bun: null,
      isLoading: false,
      lastOrder: null,
    };
  
    it('должен иметь правильное начальное состояние', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    it('добавляет ингредиент', () => {
      const ingredient = {
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
      };
      const state = reducer(initialState, addIngredients(ingredient));
      expect(state.ingredients).toContainEqual(ingredient);
    });
  
    it('устанавливает булку при выборе ингредиента', () => {
      const bun = {
        _id: '1',
        name: 'banana',
        type: 'bun',
        proteins: 10,
        fat: 20,
        carbohydrates: 15,
        calories: 220,
        price: 100,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
      };
      const state = reducer(initialState, addIngredients(bun));
      expect(state.bun).toEqual(bun);
    });
  
    it('перемещает ингредиент вверх', () => {
      const ingredients = [
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
            _id: '3',
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
      ];
      const state = reducer(
        { ...initialState, ingredients },
        moveUpIngredient(1)
      );
      expect(state.ingredients[0]._id).toBe('2');
      expect(state.ingredients[1]._id).toBe('1');
    });
  
    it('перемещает ингредиент вниз', () => {
        const ingredients = [
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
                _id: '3',
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
          ];
      const state = reducer(
        { ...initialState, ingredients },
        moveDownIngredient(0)
      );
      expect(state.ingredients[0]._id).toBe('2');
      expect(state.ingredients[1]._id).toBe('1');
    });
  
    it('удаляет ингредиент по индексу', () => {
        const ingredients = [
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
                _id: '3',
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
          ];;
      const state = reducer(
        { ...initialState, ingredients },
        deleteIngredient(1) // удаляет второй элемент
      );
      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients.find(i => i._id === '2')).toBeUndefined();
    });
  
    it('очищает заказ', () => {
      const state = reducer(
        {
          ingredients: [ {
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
        },],
          bun:  {
            _id: '2',
            name: 'banana',
            type: 'bun',
            proteins: 10,
            fat: 20,
            carbohydrates: 15,
            calories: 220,
            price: 100,
            image: 'string',
            image_large: 'string',
            image_mobile: 'string',
        },
          isLoading: true,
          lastOrder:  {
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        },
        },
        clearOrder()
      );
      expect(state).toEqual({
        ingredients: [],
        bun: null,
        isLoading: false,
        lastOrder: null
      });
    });
})