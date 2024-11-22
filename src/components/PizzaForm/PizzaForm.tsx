import React, { useState } from 'react';
import { ApiPizza } from '../../types';

interface PizzaFormProps {
  addNewPizza: (pizza: ApiPizza) => void;
  isLoading: boolean;
}

const PizzaForm: React.FC<PizzaFormProps> = ({ addNewPizza, isLoading }) => {
  const [pizza, setPizza] = useState<ApiPizza>({ urlImage: '', title: '', price: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPizza((prevPizza) => ({ ...prevPizza, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNewPizza(pizza);
  };

  return (
    <div className="container mt-5">
      <h2>Add New Pizza</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={pizza.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="urlImage" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="urlImage"
            name="urlImage"
            value={pizza.urlImage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={pizza.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Pizza'}
        </button>
      </form>
    </div>
  );
};

export default PizzaForm;
