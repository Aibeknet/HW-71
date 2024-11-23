import { IPizza, PizzaOrder } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';


interface PizzaOrderState {
  basketPizzas: PizzaOrder[];
}

const initialState: PizzaOrderState = {
  basketPizzas: [],
};

export const selectOrderPizzas = (state: RootState) => state.order.basketPizzas;

const basketPizzaSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addPizza: (state, {payload: pizza}: PayloadAction<IPizza>) => {

      const indexPizza = state.basketPizzas.findIndex(pizzaOrder => pizzaOrder.pizza.id === pizza.id);

      if (indexPizza === -1) {
        state.basketPizzas = [...state.basketPizzas, {pizza, amount: 1}];
      } else {
        const orderCopy = [...state.basketPizzas];
        const copyPizzaOrder = {...orderCopy[indexPizza]};
        copyPizzaOrder.amount++;
        orderCopy[indexPizza] = copyPizzaOrder;
        state.basketPizzas = [...orderCopy];
      }
    },
    clearOrder: (state) => {
      state.basketPizzas = [];
    },
    updateOrder: (state, {payload: pizzas}: PayloadAction<IPizza[]>) => {
      state.basketPizzas = state.basketPizzas.map((orderPizza) => {
        const updatePizza = pizzas.find(p => p.id === orderPizza.pizza.id);

        if (updatePizza) {
          return {
            ...orderPizza,
            pizza: updatePizza
          };
        }

        return orderPizza;
      });
    }
  }
});

export const orderReducer = basketPizzaSlice.reducer;
export const {addPizza, clearOrder, updateOrder} = basketPizzaSlice.actions;