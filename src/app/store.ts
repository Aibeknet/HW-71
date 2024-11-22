import { configureStore } from '@reduxjs/toolkit';
import { pizzasReducer } from '../store/slices/pizzasSlice.ts';
import { orderReducer } from '../store/slices/orderPizzaSlice.ts';

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    order: orderReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;