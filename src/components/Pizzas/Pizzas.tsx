import * as React from "react";
import { IPizza } from "../../types";
import PizzaItem from './PizzaItem.tsx';


interface Props {
  pizzas: IPizza[];
}

const Pizzas: React.FC<Props> = ({ pizzas }) => {
  console.log("Pizzas received:", pizzas);
  return (
    <>
      {pizzas.length > 0 ? (
        pizzas.map((pizza) => <PizzaItem key={pizza.id} pizza={pizza} />)
      ) : (
        <p>No pizzas available</p>
      )}
    </>
  );
};


export default Pizzas;
