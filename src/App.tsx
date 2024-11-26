import { Route, Routes } from 'react-router-dom';
import AdminPage from './containers/Admin/AdminPage';
import DishesList from './containers/DishesList/DishesList';
import EditPizza from './containers/EditPizza/EditPizza';
import ClientPage from './containers/ClientPage/ClientPage';
import Order from './containers/Admin/Order/Order';
import Orders from './containers/Admin/Orders/Orders';
import NewPizza from './containers/NewPizza/NewPIzza.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
      <Route path="order" element={<Order />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="dishes" element={<DishesList />} />
        <Route path="newPizza" element={<NewPizza />} />
        <Route path="editPizza/:pizzaId" element={<EditPizza />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default App;

