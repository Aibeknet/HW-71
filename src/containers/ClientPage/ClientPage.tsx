import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPizzas } from '../../store/thunks/pizzasThunk';
import { IPizza } from '../../types';
import { AppDispatch } from '../../app/store.ts';
import { selectPizzas } from '../../store/slices/pizzasSlice.ts';
import {addPizza} from "../../store/slices/orderPizzaSlice.ts";
import Basket from "../../components/Basket/Basket.tsx";
import Modal from "../../components/UI/Modal/Modal.tsx";

const ClientPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const pizzas = useSelector(selectPizzas);

  useEffect(() => {
    dispatch(fetchAllPizzas());
  }, [dispatch]);

  return (
    <>
      <Modal show={showModal} closeModal={() => setShowModal(false)} title="Your order:">
        <div className="modal-body">
          <Basket />
        </div>
      </Modal>
      <div className="d-flex justify-content-between container py-4">

        <div>
          <h1 className="text-center mb-4">Menu Pizzas</h1>
          <div className="d-flex flex-column">
            {pizzas.map((pizza: IPizza) => (
              <div key={pizza.id} className="card mb-4" style={{width: '18rem'}}>
                <img
                  src={pizza.urlImage}
                  alt={pizza.title}
                  className="card-img-top"
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '200px',
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{pizza.title}</h5>
                  <p className="card-text">${pizza.price}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={() => dispatch(addPizza(pizza))}>Add basket</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      Checkout
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col col-md-5 mb-2">
          <Basket/>
        </div>
      </div>
    </>
  );
};

export default ClientPage;

