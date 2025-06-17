import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const fetchGetOrders = createAsyncThunk('feeds/getOrder', async () =>
  getOrdersApi()
);

interface FeedsState {
  orders: TOrder[];
  selectedOrder: TOrder | null;
  isLoading: boolean;
  total: number;
  totalToday: number;
  userOrders: TOrder[];
}

interface OrderDetailsPayload {
  number: number;
  isUserOrders?: boolean;
}

const initialState: FeedsState = {
  orders: [],
  selectedOrder: null,
  isLoading: true,
  total: 0,
  totalToday: 0,
  userOrders: []
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    selectOrderDetails(state, action: PayloadAction<OrderDetailsPayload>) {
      const { isUserOrders, number } = action.payload;
      const neededList = isUserOrders ? state.userOrders : state.orders;
      const selected = neededList.find((order) => order.number === number);
      state.selectedOrder = selected ? selected : null;
    }
  },
  selectors: {
    selectOrders: (sliceState) => sliceState.orders,
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectSelectedOrder: (sliceState) => sliceState.selectedOrder,
    selectTotal: (sliceState) => sliceState.total,
    selectTotalToday: (sliceState) => sliceState.totalToday,
    selectUserOrders: (sliceState) => sliceState.userOrders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.isLoading = false;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      })
      .addCase(fetchGetOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      });
  }
});

export const {
  selectOrders,
  selectIsLoading,
  selectSelectedOrder,
  selectTotal,
  selectTotalToday,
  selectUserOrders
} = feedsSlice.selectors;

export const { selectOrderDetails } = feedsSlice.actions;
export default feedsSlice.reducer;
