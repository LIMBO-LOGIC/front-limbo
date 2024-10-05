import { Modal, Button, Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { useState } from "react";

ModalRedeemProduct.propTypes = {
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
};

function ModalRedeemProduct({ setIsShow, isShow }) {
  const [confirm, isConfirm] = useState(false);

  return (
    <>
      <Modal
        show={isShow}
        onHide={setIsShow}
        dialogClassName="modal-dialog-centered modal-dialog-scrollable modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Resgate de Produto</Modal.Title>
        </Modal.Header>
        {confirm ? (
          <>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formAddress">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu endereço" />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" placeholder="Digite sua cidade" />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu CEP" />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu endereço" />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" placeholder="Digite sua cidade" />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label>CEP</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu CEP" />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsShow(!isShow)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => {}}>
                Confirmar Resgate
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              <h4>Deseja mesmo resgatar o produto ?</h4>
              <div className="w-1000 d-flex gap-3 align-items-center justify-content-center">
                <p className="fs-5 my-3">1200 pontos - 800 pontos = 400 pontos</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsShow(!isShow)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => {}}>
                Confirmar Resgate
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
}

export default ModalRedeemProduct;
