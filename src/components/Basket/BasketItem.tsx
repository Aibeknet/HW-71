import { PizzaOrder } from '../../types';
import * as React from 'react';

interface Props {
  basketPizza: PizzaOrder;
}

const BasketItem: React.FC<Props> = ({ basketPizza }) => {
  return (
    <div className="card mb-3 p-2">
      <div className="row align-items-center justify-content-between">
        <div className="col-4">{basketPizza.pizza.title}</div>
        <div className="col-4">x{basketPizza.amount}</div>
        <div className="col-4">{basketPizza.pizza.price} KGS</div>
      </div>
    </div>
  );
};

export default BasketItem;
