import React, { useState } from 'react';
import Backdrop from '../Backdrop/Backdrop.tsx';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: string;
  closeModal: () => void;
  cancelLink?: string;
  orderLink?: string;
  defaultModalBtn?: boolean;
}

const Modal: React.FC<Props> = ({
  show,
  title = 'Modal title',
  children,
  closeModal,
  defaultModalBtn = true
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const isOrderButtonDisabled = !name || !address || !phone;

  const handleOrderClick = () => {
    if (name && address && phone) {
      console.log('Order placed:', { name, address, phone });
      closeModal();
    }
  };

  return (
    <>
      <Backdrop show={show} onClick={closeModal} />
      <div
        className="modal show"
        style={{
          display: show ? 'block' : 'none',
          width: '500px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            <div className="p-2">
              {children}

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Имя
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Адрес
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Введите ваш адрес"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Телефон
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Введите ваш телефон"
                />
              </div>
            </div>

            {defaultModalBtn && (
              <div className="d-flex justify-content-center mb-3">
                <button className="btn btn-danger me-4" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleOrderClick}
                  disabled={isOrderButtonDisabled}
                >
                  Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
