import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TIngredient, TOrder } from '@utils-types';

export const fetchOrderBurgerApi = createAsyncThunk(
  'basket/orderBurger',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

interface BasketState {
  ingredients: TIngredient[];
  bun: TIngredient | null;
  isLoading: boolean;
  lastOrder: TOrder | null;
}

const initialState: BasketState = {
  ingredients: [],
  isLoading: false,
  bun: null,
  lastOrder: null
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addIngredients(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    moveUpIngredient(state, action: PayloadAction<number>) {
      const tmpIngredient = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = tmpIngredient;
    },
    moveDownIngredient(state, action: PayloadAction<number>) {
      const tmpIngredient = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = tmpIngredient;
    },
    clearOrder(state) {
      state.ingredients = [];
      state.bun = null;
      state.lastOrder = null;
    },
    deleteIngredient(state, action: PayloadAction<number>) {
      state.ingredients.splice(action.payload, 1);
    }
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectBun: (sliceState) => sliceState.bun,
    selectLastOrder: (sliceState) => sliceState.lastOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lastOrder = action.payload.order;
      });
  }
});

export const {
  selectIngredients,
  selectIsLoading,
  selectBun,
  selectLastOrder
} = basketSlice.selectors;

export const {
  addIngredients,
  moveUpIngredient,
  moveDownIngredient,
  clearOrder,
  deleteIngredient
} = basketSlice.actions;
export default basketSlice.reducer;
