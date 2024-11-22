export interface IPizza {
  id: string;
  title: string;
  urlImage: string;
  price: number;
}

export interface IPizzaAlteration {
  title: string;
  urlImage: string;
  price: number;
}


export interface PizzaOrder {
  pizza: IPizza;
  amount: number;
}

export interface ICustomer {
  name: string;
  address: string;
  phone: string;
}

export interface IOrderAlteration {
  customer: ICustomer,
  pizzas: PizzaOrder[],
}

export interface IOrderAPI {
  [id: string]: IOrderAlteration;
}

export type ApiPizza = Omit<IPizzaAlteration, 'id'>

export interface PizzasList {
  [id: string]: ApiPizza
}

export interface IOrdersAPI {
  [id: string]: IOrderAlteration;
}

export interface IOrder extends  IOrderAlteration {
  id: string;
  totalPrice: number;
}