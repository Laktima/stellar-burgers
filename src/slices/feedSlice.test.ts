import reducer, {
    selectOrderDetails,
    selectOrders,
    selectIsLoading,
    selectSelectedOrder,
    selectTotal,
    selectTotalToday,
    selectUserOrders,
    fetchFeeds,
    fetchGetOrders,
  } from './feedSlice';
  import { TOrder } from '../utils/types';
  
  
  describe('feedsSlice', () => {
    const initialState = {
      orders: [],
      selectedOrder: null,
      isLoading: true,
      total: 0,
      totalToday: 0,
      userOrders: [],
    };
  
    it('должен иметь правильную начальную инициализацию', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  
    describe('extraReducers', () => {
      it('проверяем fetchFeeds.pending', () => {
        const state = reducer(initialState, fetchFeeds.pending('', undefined));
        expect(state.isLoading).toBe(true);
      });
  
      it('проверяем fetchFeeds.rejected', () => {
        const state = reducer({ ...initialState, isLoading: true }, fetchFeeds.rejected(new Error(), 'error', undefined));
        expect(state.isLoading).toBe(false);
      });
  
      it('проверяем fetchFeeds.fulfilled', () => {
        const payload = {
          orders: [{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        }],
          total: 10,
          totalToday: 5,
          success: true,
        };
        const state = reducer(initialState, fetchFeeds.fulfilled(payload, '', undefined));
        expect(state.isLoading).toBe(false);
        expect(state.orders).toEqual(payload.orders);
        expect(state.total).toBe(payload.total);
        expect(state.totalToday).toBe(payload.totalToday);
      });
  
      it('проверяем fetchGetOrders.pending', () => {
        const state = reducer(initialState, fetchGetOrders.pending('', undefined));
        expect(state.isLoading).toBe(true);
      });
  
      it('проверяем fetchGetOrders.rejected', () => {
        const state = reducer({ ...initialState, isLoading: true }, fetchGetOrders.rejected(new Error(), 'error', undefined));
        expect(state.isLoading).toBe(false);
      });
  
      it('проверяем fetchGetOrders.fulfilled', () => {
        const userOrders = [{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        }];
        const state = reducer(initialState, fetchGetOrders.fulfilled(userOrders, '', undefined));
        expect(state.isLoading).toBe(false);
        expect(state.userOrders).toEqual(userOrders);
      });
    });
  
    describe('reducers', () => {
      it('проверка selectOrderDetails', () => {
        const ordersSample: TOrder[] = [
            {
                _id: '3',
                status: 'string',
                name: 'string',
                createdAt: 'string',
                updatedAt: 'string',
                number: 1,
                ingredients: [],
            },
            {
                _id: '2',
                status: 'string',
                name: 'string',
                createdAt: 'string',
                updatedAt: 'string',
                number: 2,
                ingredients: [],
            }
        ];
        
        const state = { ...initialState, orders: ordersSample };
        
        const newState1 = reducer(state, selectOrderDetails({
            number: 1,
        }));
        expect(newState1.selectedOrder).toEqual({
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 1,
            ingredients: [],
        });
        
        const newState2 = reducer(state, selectOrderDetails({
            number: 5,
        }));
        expect(newState2.selectedOrder).toBeNull();
        
        const userOrdersSample: TOrder[] = [{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        }];
        const state2 = { ...state, userOrders: userOrdersSample };
        
        const newState3 = reducer(state2, selectOrderDetails({ number:10, isUserOrders:true }));
        expect(newState3.selectedOrder).toEqual({ _id: '3',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 10,
        ingredients: []});
        
      });
    });
  
    describe('селекторы', () => {
      const testState = {
        feeds: {orders: [{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        }],
        selectedOrder: {
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        },
        isLoading: false,
        total: 100,
        totalToday:50,
        userOrders:[{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 2,
            ingredients: [],
        }],},
      };
  
      it('selectOrders - возвращает список заказов', () => {
        expect(selectOrders(testState)).toEqual(testState.feeds.orders);
      });
      
      it('selectIsLoading - возвращает isLoading', () => {
        expect(selectIsLoading(testState)).toBe(false);
      });
      
      it('selectSelectedOrder - возвращает выбранный заказ', () => {
        expect(selectSelectedOrder(testState)).toEqual({
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 10,
            ingredients: [],
        });
      });
      
      it('selectTotal - возвращает total', () => {
        expect(selectTotal(testState)).toBe(100);
      });
      
      it('selectTotalToday - возвращает totalToday', () => {
          expect(selectTotalToday(testState)).toBe(50);
      });
      
      it('selectUserOrders - возвращает userOrders', () => {
          expect(selectUserOrders(testState)).toEqual([{
            _id: '3',
            status: 'string',
            name: 'string',
            createdAt: 'string',
            updatedAt: 'string',
            number: 2,
            ingredients: [],
        }]);
      });
    })
  });