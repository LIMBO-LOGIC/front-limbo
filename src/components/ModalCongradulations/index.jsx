/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import styles from "./modalCongradulations.module.css";
import successImg from "../../assets/product_rescue.svg";
import { useNavigate } from "react-router-dom";

export default function ModalCongradulations({ isShow, setIsShow, setPayment, type }) {
    const navigate = useNavigate()
  const handleClose = () => {
    setIsShow(false);
    setPayment(false)
    if(type === 'product'){
      navigate('/race/profile')
    }else{
      navigate('/race')
    }
  };

  return (
    <>
      <Modal
        show={isShow}
        onHide={handleClose}
        dialogClassName="modal-dialog-centered modal-dialog-scrollable modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Compra Realizada</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bodyConfirmed}>
          <div className={styles.containerProduct}>
            <img
              src={successImg}
              alt={"Imagem de produto resgatado com sucesso"}
            />
          </div>
          <h3 className="w-100 text-center">{type == 'product' ? 'Produto resgatado' : 'Pontos resgatados'} !</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
