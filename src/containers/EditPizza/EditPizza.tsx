import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePizzaById, editPizza } from '../../store/thunks/pizzasThunk';
import { selectOnePizza, selectFetchOnePizzaLoading } from '../../store/slices/pizzasSlice';
import { ApiPizza } from '../../types';
import { AppDispatch } from '../../app/store.ts';
import { toast } from 'react-toastify';

const EditPizza = () => {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pizza = useSelector(selectOnePizza);
  const isLoading = useSelector(selectFetchOnePizzaLoading);
  const [editedPizza, setEditedPizza] = useState<ApiPizza | null>(null);

  useEffect(() => {
    if (pizzaId) {
      dispatch(getOnePizzaById(pizzaId));
    }
  }, [dispatch, pizzaId]);

  useEffect(() => {
    if (pizza) {
      setEditedPizza(pizza);
    }
  }, [pizza]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPizza((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editedPizza && pizzaId) {
      if (!editedPizza.title || !editedPizza.urlImage || !editedPizza.price) {
        toast.error("All fields are required!");
        return;
      }

      try {
        await dispatch(editPizza({ pizzaId, pizza: editedPizza }));
        toast.success("Pizza edited successfully!");
        navigate('/admin/dishes');
      } catch {
        toast.error("Failed to edit pizza");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!editedPizza) return <div>Pizza not found</div>;

  return (
    <div>
      <h2>Edit Pizza</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editedPizza.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input
            type="text"
            name="urlImage"
            value={editedPizza.urlImage}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={editedPizza.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPizza;
