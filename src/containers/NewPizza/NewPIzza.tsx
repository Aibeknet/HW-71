import PizzaForm from '../../components/PizzaForm/PizzaForm.tsx';
import { ApiPizza } from '../../types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPizza, fetchAllPizzas } from '../../store/thunks/pizzasThunk';
import { selectCreatePizzaLoading } from '../../store/slices/pizzasSlice';

const NewPizza = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createPizzaLoading = useAppSelector(selectCreatePizzaLoading);

  const addNewPizza = async (pizza: ApiPizza) => {
    await dispatch(createPizza({ ...pizza }));
    navigate('/admin/dishes');
    toast.success("Pizza was added successfully!");

    await dispatch(fetchAllPizzas());
  };

  return (
    <div className="mb-2">
      <PizzaForm addNewPizza={addNewPizza} isLoading={createPizzaLoading} />
    </div>
  );
};

export default NewPizza;
