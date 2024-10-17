import { Modal, Button, Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
import { useState } from "react";
import styles from "./modalRedeemProduct.module.css";
import ReactInputMask from "react-input-mask";
import useContexts from "../../hooks/useContext";
import axios from "axios";
import { MdOutlineLocationOn } from "react-icons/md";
import successImg from "../../assets/product_rescue.svg";
import { baseUrl } from "../../service/api";

ModalRedeemProduct.propTypes = {
  setIsShow: PropTypes.func,
  isShow: PropTypes.bool,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    details: PropTypes.string,
    image: PropTypes.string.isRequired,
    change_points: PropTypes.string.isRequired,
    id_favorite_product: PropTypes.number,
  })
};

function ModalRedeemProduct({ setIsShow, isShow, product }) {
  const [screen, setScreen] = useState("confirmRescue"); // confirmRescue - confirmAddress - dataAddress - confirmed
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const { dataUser, setDataUser, setIsLoading } = useContexts();

  const handleClose = () => {
    setScreen("confirmRescue");
    setCep("");
    console.log(dataUser.current_points);
    console.log(product.change_points);
    console.log(dataUser.current_points > product.change_points);
    setIsShow(false);
  };

  function cleanMask(valor) {
    return valor ? valor.replace(/[^\d]+/g, "") : "";
  }

  const searchCep = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .get(`https://viacep.com.br/ws/${cleanMask(cep)}/json/`)
      .then((response) => {
        setAddress(response.data);
        // calculaFrete(cep);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setScreen("dataAddress");
      });
  };

  const confirmRescue = () => {
    setIsLoading(true);
    const dataBody = {
      userId: dataUser.id,
      productId: product.id,
    };

    axios
      .post(`${baseUrl}/product-rescues`, dataBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        const bodyPuut = {
          allPoints: dataUser.all_points,
          currentPoints:
            Number(dataUser.current_points) - Number(product.change_points),
        };
        axios
          .put(`${baseUrl}/user/${dataUser.id}/points`, bodyPuut, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            axios
              .get(`${baseUrl}/user/${dataUser.id}`)
              .then((response) => {
                setDataUser(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        setScreen("confirmed");
      });
  };

  return (
    <>
      {Number(dataUser.current_points) >= Number(product.change_points) ? (
        <Modal
          show={isShow}
          onHide={handleClose}
          dialogClassName="modal-dialog-centered modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Resgate de Produto</Modal.Title>
          </Modal.Header>
          {screen == "confirmRescue" && (
            <>
              <Modal.Body>
                <h4>Deseja mesmo resgatar o produto ?</h4>
                <div className={styles.containerProduct}>
                  <img
                    className={styles.imgProduct}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className="w-1000 d-flex gap-3 align-items-center justify-content-center">
                  <p className="fs-5 my-3">
                    {dataUser.current_points} pontos - {product.change_points}{" "}
                    pontos ={" "}
                    {Number(dataUser.current_points) -
                      Number(product.change_points)}{" "}
                    pontos restantes
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setScreen("confirmAddress")}
                >
                  Continuar Resgate
                </Button>
              </Modal.Footer>
            </>
          )}
          {screen == "confirmAddress" && (
            <>
              <Modal.Body className="py-4 px-4">
                <h5>Calcule o frete e prazo de entrega</h5>
                <p>Saiba os prazos de entrega e as formas de envio.</p>
                <Form onSubmit={searchCep}>
                  <div className="col-12 row mt-3">
                    <div className="col-12 col-md-7 mb-3 mb-md-0">
                      <label htmlFor="cep" className="ps-1">
                        CEP
                      </label>
                      <ReactInputMask
                        type="tel"
                        mask="99999-999"
                        maskChar={null}
                        className="form-control mt-1"
                        id="cep"
                        autoComplete="off"
                        placeholder="Informar um CEP"
                        onChange={(e) => setCep(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-5 d-flex align-items-end">
                      <button
                        type="submit"
                        className="col-12 btn btn-primary px-4"
                      >
                        Calcular
                      </button>
                    </div>
                  </div>
                </Form>
              </Modal.Body>
            </>
          )}
          {screen == "dataAddress" && (
            <>
              <Modal.Body className="py-4 px-4">
                <h5>Frete e prazo de entrega</h5>
                <p className="mt-2">
                  <MdOutlineLocationOn size={20} className="me-1" />
                  {address?.logradouro
                    ? `${address.logradouro}, ${address.bairro} -
         ${address.localidade} - ${address.uf}`
                    : ""}
                </p>
                <div className="d-flex px-3 mt-4" id={styles.headerFretes}>
                  <div className="col">
                    <p>Transportadora</p>
                  </div>

                  <div className="col">
                    <p>Modalidade</p>
                  </div>

                  <div className="col">
                    <p>Prazo Estimado</p>
                  </div>

                  <div className="col text-end">
                    <p>Preço</p>
                  </div>
                </div>
                <div
                  className={`${styles.cardEndereco} mb-1 mt-2 card rounded-1 py-2`}
                >
                  <div className="d-flex align-items-center px-3 py-2">
                    <label
                      className={`form-check-label col-12 d-flex justify-content-between`}
                      htmlFor={"frete"}
                    >
                      <div className="col">
                        <img
                          src={
                            "https://www.melhorenvio.com.br/images/shipping-companies/azulcargo.png"
                          }
                          alt={"Azul cargo express"}
                          className={styles.imgFrete}
                        />
                      </div>

                      <div className="col">
                        <p>Normal</p>
                      </div>

                      <div className="col">
                        <p>2 - 3 dias úteis</p>
                      </div>

                      <div className="col text-end">
                        <p className="fw-semibold">R$ 14,95</p>
                      </div>
                    </label>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={confirmRescue}>
                  Confirmar
                </Button>
              </Modal.Footer>
            </>
          )}
          {screen == "confirmed" && (
            <>
              <Modal.Body className={styles.bodyConfirmed}>
                <div className={styles.containerProduct}>
                  <img
                    src={successImg}
                    alt={"Imagem de produto resgtado com sucesso"}
                  />
                </div>
                <h3 className="w-100 text-center">Produto Resgatado !</h3>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Fechar
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      ) : (
        <Modal
          show={isShow}
          onHide={handleClose}
          dialogClassName="modal-dialog-centered modal-dialog-scrollable modal-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Resgate de Produto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h5>Pontos insuficientes para resgatar esse produto.</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

// <Form>
//                 <Form.Group controlId="formAddress">
//                   <Form.Label>Endereço</Form.Label>
//                   <Form.Control type="text" placeholder="Digite seu endereço" />
//                 </Form.Group>
//                 <Form.Group controlId="formCity">
//                   <Form.Label>Cidade</Form.Label>
//                   <Form.Control type="text" placeholder="Digite sua cidade" />
//                 </Form.Group>
//                 <Form.Group controlId="formZip">
//                   <Form.Label>CEP</Form.Label>
//                   <Form.Control type="text" placeholder="Digite seu CEP" />
//                 </Form.Group>

//                 <Form.Group controlId="formAddress">
//                   <Form.Label>Endereço</Form.Label>
//                   <Form.Control type="text" placeholder="Digite seu endereço" />
//                 </Form.Group>
//                 <Form.Group controlId="formCity">
//                   <Form.Label>Cidade</Form.Label>
//                   <Form.Control type="text" placeholder="Digite sua cidade" />
//                 </Form.Group>
//                 <Form.Group controlId="formZip">
//                   <Form.Label>CEP</Form.Label>
//                   <Form.Control type="text" placeholder="Digite seu CEP" />
//                 </Form.Group>
//               </Form>

export default ModalRedeemProduct;
