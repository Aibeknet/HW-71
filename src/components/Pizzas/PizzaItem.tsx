import { IPizza } from '../../types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { deleteOnePizza, fetchAllPizzas } from '../../store/thunks/pizzasThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../app/store.ts';
import { toast } from 'react-toastify';

interface Props {
  pizza: IPizza;
}

const PizzaItem: React.FC<Props> = ({ pizza }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const imageUrl =
    'https://www.shutterstock.com/image-vector/not-found-glitch-style-vector-260nw-743166634.jpg';
  const imageStyle = {
    background: `url(${pizza.urlImage || imageUrl}) center center/cover no-repeat`,
  };

  const handleDelete = async () => {
    if (pizza.id && window.confirm("Are you sure you want to delete this pizza?")) {
      try {
        await dispatch(deleteOnePizza(pizza.id));
        toast.success("Pizza deleted successfully!");
        dispatch(fetchAllPizzas());
        navigate('/admin/dishes');
      } catch {
        toast.error("Failed to delete pizza");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/admin/editPizza/${pizza.id}`);
  };

  return (
    <div className="card mb-3 p-4">
      <div className="row justify-content-between">
        <div className="col-5" style={imageStyle} />
        <div className="col-6">
          <h5 className="card-title">{pizza.title}</h5>
          <p className="card-text">Price: {pizza.price} SOM</p>

          <div className="d-flex justify-content-between">
            <button className="btn btn-warning" onClick={handleEdit}>
              Edit
            </button>
            <button onClick={handleDelete} className="btn btn-danger mt-2">Delete Pizza</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
