import { useAppSelector } from '../../app/hooks.ts';
import { selectOrderPizzas } from '../../store/slices/orderPizzaSlice.ts';
import BasketPizzas from './BasketPizzas.tsx';

const Basket = () => {
  const basketPizzas = useAppSelector(selectOrderPizzas);

  return (
    <>
      <h4>Basket</h4>
      <BasketPizzas basket={basketPizzas} />
    </>
  );
};

export default Basket;
