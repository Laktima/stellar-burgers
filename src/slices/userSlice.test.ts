import reducer, {
    selectIsLoading,
    selectUser,
    fetchLogin,
    fetchRegisterUser,
    fetchUser,
    fetchLogout,
    fetchForgotPassword,
    fetchUpdateUser,
  } from './userSlice';
  
  jest.mock('../utils/cookie', () => ({
    setCookie: jest.fn(),
    deleteCookie: jest.fn(),
  }));
  
  import { setCookie, deleteCookie } from '../utils/cookie';
  
  describe('userSlice', () => {
    const initialState = {
      user: null,
      isLoading: true,
    };
  
    it('должен иметь правильную начальную инициализацию', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    describe('extraReducers', () => {
      it('проверяем fetchLogin.pending', () => {
        const state = reducer(initialState, fetchLogin.pending('', {email: '1', password: '1'}));
        expect(state.isLoading).toBe(true);
      });
  
      it('проверяем fetchLogin.rejected', () => {
        const state = reducer({ ...initialState, isLoading: true }, fetchLogin.rejected(new Error(), 'error', {email: '1', password: '1'}));
        expect(state.isLoading).toBe(false);
      });
  
      it('проверяем fetchLogin.fulfilled', () => {
        const payload = {
          user: { name: 'Test User', email: '1' },
          accessToken: 'access_token',
          refreshToken: 'refresh_token',
          success: true,
        };
        const state = reducer(initialState, fetchLogin.fulfilled(payload, '', {email: '1', password: '1'}));
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(payload.user);
        expect(setCookie).toHaveBeenCalledWith('accessToken', payload.accessToken);
        expect(setCookie).toHaveBeenCalledWith('refreshToken', payload.refreshToken);
      });
  
      it('проверяем fetchRegisterUser.fulfilled', () => {
        const payload = {
          user: { name: 'Reg User', email: '1' },
          accessToken: 'reg_access_token',
          refreshToken: 'reg_refresh_token',
          success: true,
        };
        const state = reducer(initialState, fetchRegisterUser.fulfilled(payload, '', {email: '1', password: '1', name: 'Reg User'}));
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(payload.user);
        expect(setCookie).toHaveBeenCalledWith('accessToken', payload.accessToken);
        expect(setCookie).toHaveBeenCalledWith('refreshToken', payload.refreshToken);
      });
  
      it('проверяем fetchUser.fulfilled', () => {
        const payload = { user: { name: 'Fetched User', email: '1' }, success: true, };
        const state = reducer({ ...initialState, isLoading: true }, fetchUser.fulfilled(payload, '', undefined));
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual(payload.user);
      });
  
      it('проверяем fetchLogout.fulfilled с success=true', () => {
        const payload = { success: true };
        const prevState = { ...initialState, user: { name: 'To be cleared', email: '1' }, isLoading: true };
        
        const state = reducer(prevState, fetchLogout.fulfilled(payload, '', undefined));
        
        expect(state.isLoading).toBe(false);
        expect(state.user).toBeNull();
        expect(deleteCookie).toHaveBeenCalledWith('accessToken');
        expect(deleteCookie).toHaveBeenCalledWith('refreshToken');
      });
  
      it('проверяем fetchLogout.fulfilled с success=false (не очищает пользователя)', () => {
        const payload = { success: false };
        
        const prevState = { ...initialState, user: { name: 'Existing User', email: '1' }, isLoading: true };
        
        const state = reducer(prevState, fetchLogout.fulfilled(payload, '', undefined));
        
        expect(state.isLoading).toBe(false);
        expect(state.user).toEqual({ name: 'Existing User', email: '1' });
      });
  
      it('проверяем fetchForgotPassword.fulfilled', () => {
        const stateBefore = { ...initialState, isLoading: true };
        
        const stateAfter = reducer(stateBefore, fetchForgotPassword.fulfilled(undefined, '', { email: 'test@example.com' }));
        
        expect(stateAfter.isLoading).toBe(false);
      });
      
      it('проверяем fetchUpdateUser.fulfilled', () => {
        const prevUser = { name: 'Old Name', email: '1' };
        
        const newUserData = { name: 'New Name', email: '2' };
        
        const stateBefore = { ...initialState, user: prevUser, isLoading: true };
        
        const newPayload = { user: newUserData, success: true };
        
        const stateAfter = reducer(stateBefore, fetchUpdateUser.fulfilled(newPayload, '', newUserData));
        
        expect(stateAfter.isLoading).toBe(false);
        
        expect(stateAfter.user).toEqual(newUserData);
      });
    });
  
    describe('селекторы', () => {
      const testState = {
          user: {
              user: { name: 'Test User', email: '1' },
              isLoading: false,
          }
      };

      
      it('selectIsLoading - возвращает isLoading', () => {
          expect(selectIsLoading(testState)).toBe(false);
      });
      
      it('selectUser - возвращает пользователя', () => {
          expect(selectUser(testState)).toEqual({ name: 'Test User', email: '1' });
      });
    })
  });