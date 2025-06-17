import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  getUserApi,
  logoutApi,
  forgotPasswordApi,
  updateUserApi,
  getOrdersApi
} from '@api';
import { TOrder, TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../utils/cookie';

export const fetchLogin = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const fetchLogout = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const fetchForgotPassword = createAsyncThunk(
  'uset/forgotPassword',
  async (data: { email: string }) => {
    forgotPasswordApi(data);
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

interface UserState {
  user: TUser | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectUser: (sliceState) => sliceState.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.isLoading = false;
        state.user = user;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken } = action.payload;
        state.isLoading = false;
        state.user = user;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = null;
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      })
      .addCase(fetchForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchForgotPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      });
  }
});

export const { selectIsLoading, selectUser } = userSlice.selectors;

export const {} = userSlice.actions;
export default userSlice.reducer;
