import { Modal, Button, Form } from "react-bootstrap";

function ModalRedeemProduct({ setIsShow, isShow }) {
  return (
    <>
      <Modal show={isShow} onHide={setIsShow}>
        <Modal.Header closeButton>
          <Modal.Title>Resgate de Produto</Modal.Title>
        </Modal.Header>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirmar Resgate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRedeemProduct;
