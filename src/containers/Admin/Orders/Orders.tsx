import { useEffect, useState } from 'react';
import axiosApi from '../../../axiosAPI';
import { IOrder, IOrdersAPI } from '../../../types';
import { toast } from 'react-toastify';

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosApi<IOrdersAPI | null>('orders.json');

      const ordersResponse = response.data;

      if (!ordersResponse) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const ordersList: IOrder[] = Object.keys(ordersResponse).map(orderId => {
        const order = ordersResponse[orderId];

        if (!order.pizzas || order.pizzas.length === 0) {
          toast.error(`Order ${orderId} is missing pizzas`);
          return null;
        }

        const totalPrice = order.pizzas.reduce((acc, pizza) => {
          if (pizza && pizza.pizza && pizza.pizza.price && pizza.amount) {
            acc += pizza.amount * pizza.pizza.price;
          } else {
            toast.error(`Invalid pizza data in order ${orderId}`);
          }
          return acc;
        }, 0);

        return {
          id: orderId,
          ...order,
          totalPrice,
        };
      }).filter(order => order !== null);

      setOrders(ordersList.reverse());
    } catch (e) {
      toast.error('Error fetching orders');
      console.error('Error fetching orders:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {orders.length > 0 ?
        orders.map((order) => (
          <div key={order.id} className="card mb-4 p-3">
            <p className="m-0">
              <strong>{order.customer.name}</strong>: total orders cost is <strong>{order.totalPrice}</strong> SOM
            </p>
          </div>
        ))
        :
        <p>No orders yet</p>
      }
    </>
  );
};

export default Orders;
