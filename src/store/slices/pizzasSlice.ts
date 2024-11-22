import { ApiPizza, IPizza } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPizza, deleteOnePizza, editPizza, fetchAllPizzas, getOnePizzaById } from '../thunks/pizzasThunk';
import { RootState } from '../../app/store.ts';

interface PizzasState {
  pizzas: IPizza[];
  onePizza: ApiPizza | null;
  isFetchLoading: boolean;
  isFetchOnePizzaLoading: boolean;
  isDeleteLoading: boolean | string;
  isCreateLoading: boolean;
  isEditLoading: boolean;
}

const initialState: PizzasState = {
  pizzas: [],
  onePizza: null,
  isFetchLoading: false,
  isFetchOnePizzaLoading: false,
  isDeleteLoading: false,
  isCreateLoading: false,
  isEditLoading: false,
};

export const selectPizzas = (state: RootState) => state.pizzas.pizzas;
export const selectOnePizza = (state: RootState) => state.pizzas.onePizza;
export const selectFetchPizzasLoading = (state: RootState) => state.pizzas.isFetchLoading;
export const selectFetchOnePizzaLoading = (state: RootState) => state.pizzas.isFetchOnePizzaLoading;
export const selectCreatePizzaLoading = (state: RootState) => state.pizzas.isCreateLoading;
export const selectEditPizzaLoading = (state: RootState) => state.pizzas.isEditLoading;


export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPizzas.pending, (state) => {
        state.isFetchLoading = true;
      })
      .addCase(fetchAllPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
        console.log("Data received from fetchAllPizzas:", action.payload);
        state.pizzas = action.payload;
        state.isFetchLoading = false;
      })
      .addCase(fetchAllPizzas.rejected, (state) => {
        state.isFetchLoading = false;
      })
      .addCase(deleteOnePizza.pending, (state, { meta }) => {
        state.isDeleteLoading = meta.arg;
      })
      .addCase(deleteOnePizza.fulfilled, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(deleteOnePizza.rejected, (state) => {
        state.isDeleteLoading = false;
      })
      .addCase(createPizza.pending, (state) => {
        state.isCreateLoading = true;
      })
      .addCase(createPizza.fulfilled, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(createPizza.rejected, (state) => {
        state.isCreateLoading = false;
      })
      .addCase(getOnePizzaById.pending, (state) => {
        state.isFetchOnePizzaLoading = true;
        state.onePizza = null;
      })
      .addCase(getOnePizzaById.fulfilled, (state, action: PayloadAction<ApiPizza | null>) => {
        state.isFetchOnePizzaLoading = false;
        state.onePizza = action.payload;
      })
      .addCase(getOnePizzaById.rejected, (state) => {
        state.isFetchOnePizzaLoading = false;
      })
      .addCase(editPizza.pending, (state) => {
        state.isEditLoading = true;
      })
      .addCase(editPizza.fulfilled, (state) => {
        state.isEditLoading = false;
        state.onePizza = null;
      })
      .addCase(editPizza.rejected, (state) => {
        state.isEditLoading = false;
      });
  }
});

export const pizzasReducer = pizzasSlice.reducer;

