import Backdrop from '../Backdrop/Backdrop.tsx';
import { Link } from 'react-router-dom';


interface Props extends React.PropsWithChildren{
  show: boolean;
  title: string;
  closeModal: () => void;
  defaultModalBtn?: boolean;
}

const Modal: React.FC<Props> = ({show, title = 'Modal title', children, closeModal, defaultModalBtn}) => {

  return (
    <>
      <Backdrop show={show} onClick={closeModal}/>
      <div className="modal show" style={{display: show ? 'block' : 'none', width: "500px", position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{title}</h1>
            </div>
            <div className="p-2">
              {children}
            </div>
            <div className="d-flex gap-2">
              <Link className="btn btn-danger" to="/">Cancel</Link>
              <Link className="btn btn-primary" to="order">Order</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;



