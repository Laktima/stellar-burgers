import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

interface IngredientsState {
  ingredients: TIngredient[];
  selectedIngredient: TIngredient | null;
  isLoading: boolean;
}

const initialState: IngredientsState = {
  ingredients: [],
  selectedIngredient: null,
  isLoading: true
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    selectIngredientDetails(state, action: PayloadAction<string>) {
      const selected = state.ingredients.find(
        (ingredient) => ingredient._id === action.payload
      );
      state.selectedIngredient = selected ? selected : null;
    }
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectSelectedIngredient: (sliceState) => sliceState.selectedIngredient
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectIsLoading, selectSelectedIngredient } =
  ingredientsSlice.selectors;

export const { selectIngredientDetails } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
