import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectFetchPizzasLoading, selectPizzas } from '../../store/slices/pizzasSlice.ts';
import { fetchAllPizzas } from '../../store/thunks/pizzasThunk.ts';
import Pizzas from '../../components/Pizzas/Pizzas.tsx';
import { useNavigate } from 'react-router-dom';

const DishesList = () => {
  const isLoadingPizzas = useAppSelector(selectFetchPizzasLoading);
  const pizzas = useAppSelector(selectPizzas);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchPizzas = useCallback(async () => {
    await dispatch(fetchAllPizzas());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === '/admin/dishes') {
      void fetchPizzas();
    }
  }, [fetchPizzas, location.pathname]);

  const handleAddNewPizza = () => {
    navigate('/admin/newPizza');
  };

  return (
    <>
      {isLoadingPizzas ? <Spinner /> :
        <div className="row justify-content-between">
          <div className="d-flex justify-content-between mb-3">
            <h3>Dishes</h3>
            <button
              onClick={handleAddNewPizza}
              className="btn btn-primary"
            >
              Add new Pizza
            </button>
          </div>

          <hr />
          <div className="col col-md-5 mb-2">
            {pizzas.length > 0 ?
              <Pizzas pizzas={pizzas} />
              : <p>Not pizzas yet</p>
            }
          </div>
        </div>
      }
    </>
  );
};

export default DishesList;


