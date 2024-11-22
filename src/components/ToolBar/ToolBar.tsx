import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const ToolBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <NavLink to="/admin"><span className="navbar-brand mb-0 text-white fs-1">Turtle Pizza Admin</span></NavLink>
          <div className="ms-auto">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
    ;
};

export default ToolBar;
