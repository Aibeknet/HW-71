import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiPizza, IPizza, PizzasList } from '../../types';
import axiosApi from '../../axiosAPI.ts';
import { updateOrder } from '../slices/orderPizzaSlice.ts';

export const fetchAllPizzas = createAsyncThunk<IPizza[], void>(
  'pizzas/fetchAllPizzas',
  async (_arg, thunkAPI) => {
    try {
      const response: {data: PizzasList | null} = await axiosApi('pizzas.json');
      const pizzasList = response.data;

      console.log("Fetched pizzas:", pizzasList); // Логирование данных

      if (pizzasList === null) {
        return [];
      }

      const pizzas: PizzasList = pizzasList;
      const newPizzas = Object.keys(pizzasList).map(pizza => {
        return {
          ...pizzas[pizza],
          id: pizza
        };
      });

      thunkAPI.dispatch(updateOrder(newPizzas));
      return newPizzas;
    } catch (error) {
      console.error("Error fetching pizzas:", error);
      return [];
    }
  }
);

export const deleteOnePizza = createAsyncThunk<void, string>(
  'pizzas/deleteOnePizza',
  async (pizzaId: string) => {
    await axiosApi.delete(`pizzas/${pizzaId}.json`);
  }
);

export const createPizza = createAsyncThunk<void, ApiPizza>(
  'pizzas/createPizza',
  async (pizza: ApiPizza) => {
    await axiosApi.post('pizzas.json', { ...pizza });
  }
);

export const getOnePizzaById = createAsyncThunk<ApiPizza | null, string> (
  'pizzas/getOnePizzaById',
  async (pizzaId) => {
    const response = await axiosApi<ApiPizza | null>(`pizzas/${pizzaId}.json`);
    return response.data || null;
  }
);

export const editPizza = createAsyncThunk<void, {pizzaId: string, pizza: ApiPizza}>(
  'pizzas/editPizza',
  async ({pizzaId, pizza}) => {
    await axiosApi.put(`pizzas/${pizzaId}.json`, {...pizza});
  }
);
