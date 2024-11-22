
import { PizzaOrder } from '../../types';
import BasketItem from './BasketItem.tsx';

interface Props {
  basket: PizzaOrder[];
}

const BasketPizzas: React.FC<Props> = ({ basket }) => {
  const total = basket.reduce((acc, basketPizza) => {
    acc = acc + basketPizza.pizza.price * basketPizza.amount;
    return acc;
  }, 0);

  let basketList = (
    <div className="alert alert-primary" role="alert">
      <h6 className="text-center my-4">No pizza yet. Add something ...</h6>
    </div>
  );

  if (basket.length > 0) {
    basketList = (
      <div>
        {basket.map(basketPizza => (
          <BasketItem key={basketPizza.pizza.id} basketPizza={basketPizza} />
        ))}
        <hr />
        <div className="row row-cols-2 align-items-center justify-content-between px-3">
          <div className="text-start p-0">
            <p><strong>Total: </strong></p>
          </div>
          <div className="text-end p-0">
            <p>{total} SOM</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row mt-2">
        {basketList}
      </div>
    </div>
  );
};

export default BasketPizzas;
