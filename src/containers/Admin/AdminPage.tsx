import Layout from '../../components/Layout/Layout.tsx';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div>
      <Layout>
        <Outlet></Outlet>
      </Layout>
    </div>
  );
};

export default AdminPage;