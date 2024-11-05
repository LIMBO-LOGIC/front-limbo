import styles from "./buyProduct.module.css";
import useContexts from "../../hooks/useContext";
import { MdOutlineEditLocation, MdOutlinePayment, MdPix } from "react-icons/md";
import { FaBarcode } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import axios from "axios";
import ModalPix from "../../components/ModalPix";
import imgQrCode from "/assets/qrcode.png";
import CardProductPoint from "../../components/CardProductPoint";
import CardProductMarketplace from "../../components/CardProductMarketplace";
import ModalCongradulations from "../../components/ModalCongradulations";

export default function BuyProduct() {
  const { orderData, dataUser } = useContexts();
  const [showPix, setShowPix] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorPayment, setErrorPayment] = useState(false);
  const [frete, setFrete] = useState("--");
  const [total, setTotal] = useState(null);
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState(false);
  const [valoresFormulario, setValoresFormulario] = useState({
    nomeEndereco: "",
    cep: "",
    logradouro: "",
    complemento: "",
    numero: "",
    bairro: "",
    uf: "",
    municipio: "",
  });

  useEffect(() => {
    setTotal(
      orderData != null
        ? orderData?.type == "product"
          ? orderData.price != 0 ? formatToPrice(orderData?.price) : orderData?.price
          : orderData?.price
        : 0
    );
  }, [setTotal, orderData]);

  const handleChangePagamento = (event) => {
    setErrorPayment(false);
    setPaymentMethod(event.target.id);
  };

  const fetchAddressFromCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      return null;
    }
  };

  function formatToPrice(value) {
    const formattedValue = (value - 0.1).toFixed(2);
    return formattedValue.replace(".", ",");
  }

  function formatToPriceFloat(value) {
    const formattedValue = (value - 0.1).toFixed(2);
    return formattedValue;
  }

  const handleCEPChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length == 8) {
      const addressData = await fetchAddressFromCEP(cep);

      if (addressData) {
        const { logradouro, bairro, localidade, uf } = addressData;

        setValoresFormulario((prevState) => ({
          ...prevState,
          logradouro: logradouro,
          bairro: bairro,
          municipio: localidade,
          uf: uf,
        }));
        setFrete("7,90");

        if (orderData?.type === "product") {
          console.log(orderData.price);
          console.log();
          let price = orderData.price == 0 ? orderData.price : formatToPriceFloat(orderData.price)
          setTotal(
            (parseFloat(price) + 7.9).toFixed(2).replace(".", ",")
          );
        } else {
          setTotal(
            formatToPrice(parseFloat(orderData.price) + parseFloat("7.90"))
          );
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValoresFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Remove o erro ao preencher o campo
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleBuyOrder = () => {
    if (paymentMethod == "") {
      setErrorPayment(true);
      return;
    }

    if (orderData?.type === "product") {
      const newErrors = {};

      Object.keys(valoresFormulario).forEach((field) => {
        if (!valoresFormulario[field] && field !== "complemento") {
          newErrors[field] = "Este campo é obrigatório";
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        if (paymentMethod == "pix") {
          setShowPix(true);
        } else {
          setShowPix(true);
        }
      }
    } else {
      if (paymentMethod == "pix") {
        setShowPix(true);
      } else {
        setShowPix(true);
      }
    }
  };

  return (
    <>
      <section className={`${styles.containerBuy} container`}>
        <div className={`${styles.secProduct} notContainer`}>
          <section className={`${styles.cardItens} card notContainer`}>
            <div className={styles.title}>
              <h5>Produto</h5>
            </div>
      
            {orderData?.type === "product" ? (
              <CardProductMarketplace product={orderData} />
            ) : (
              <CardProductPoint
                type={orderData != null && orderData.type}
                product={orderData}
              />
            )}
          </section>

          <section
            className={`${styles.cardItens} ${styles.paymentMethod} card notContainer`}
          >
            <div className={`${styles.title} ${styles.titlePaymentMethod}`}>
              <h5 className="d-flex align-items-center gap-2">
                <MdOutlinePayment size={25} /> Formas de pagamento
              </h5>
            </div>
            <div
              className={`${styles.cardEndereco} card rounded-1 px-3  ${
                paymentMethod === "pix" && styles.radioSelected
              }`}
            >
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input mt-0"
                  type="radio"
                  name="paymentMethod"
                  id="pix"
                  checked={paymentMethod === "pix"}
                  onChange={handleChangePagamento}
                />
                <label
                  className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between align-items-center"
                  htmlFor="pix"
                >
                  <span>
                    PAGAMENTO VIA PIX <br />
                    <span
                      className={`${styles.textCard} fw-normal`}
                      style={{ color: "#0001fd" }}
                    >
                      Aprovação imediata
                    </span>
                  </span>
                  <MdPix size={22} />
                </label>
              </div>
            </div>

            <div
              className={`${styles.cardEndereco} card rounded-1 px-3  ${
                paymentMethod === "boleto" && styles.radioSelected
              }`}
            >
              <div className="form-check d-flex align-items-center">
                <input
                  className="form-check-input mt-0"
                  type="radio"
                  name="paymentMethod"
                  id="boleto"
                  checked={paymentMethod === "boleto"}
                  onChange={handleChangePagamento}
                />
                <label
                  className="ms-3 pe-2 form-check-label col-12 d-flex justify-content-between align-items-center"
                  htmlFor="boleto"
                >
                  <span>
                    BOLETO
                    <br />
                    <span
                      className={`${styles.textCard} fw-normal`}
                      style={{ color: "#0001fd" }}
                    >
                      Será aprovado em 1 ou 2 dias úteis.
                    </span>
                  </span>
                  <FaBarcode size={22} />
                </label>
              </div>
            </div>
            {errorPayment && (
              <p style={{ color: "red" }}>Escolha uma forma de pagamento!</p>
            )}
          </section>

          {orderData?.type === "product" && (
            <>
              <section
                className={`${styles.cardItens} ${styles.paymentMethod} card notContainer`}
              >
                <div className={`${styles.title} ${styles.titlePaymentMethod}`}>
                  <h5 className="d-flex align-items-center gap-2">
                    <MdOutlineEditLocation size={25} /> Endereço
                  </h5>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-3 mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Destinatário*"
                        aria-label="Destinatário*"
                        name="nomeEndereco"
                        value={valoresFormulario.nomeEndereco}
                        onChange={handleChange}
                      />
                      {errors.nomeEndereco && (
                        <p style={{ color: "red" }}>{errors.nomeEndereco}</p>
                      )}
                    </div>
                    <div className="col">
                      <ReactInputMask
                        type="tel"
                        mask="99999-999"
                        maskChar={null}
                        className="form-control"
                        placeholder="CEP*"
                        aria-label="CEP*"
                        name="cep"
                        onBlur={handleCEPChange}
                        value={valoresFormulario.cep}
                        onChange={handleChange}
                      />
                      {errors.cep && (
                        <p style={{ color: "red" }}>{errors.cep}</p>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="UF*"
                        aria-label="UF*"
                        name="uf"
                        value={valoresFormulario.uf}
                        onChange={handleChange}
                      />
                      {errors.uf && <p style={{ color: "red" }}>{errors.uf}</p>}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Município*"
                        aria-label="Município*"
                        name="municipio"
                        value={valoresFormulario.municipio}
                        onChange={handleChange}
                      />
                      {errors.municipio && (
                        <p style={{ color: "red" }}>{errors.municipio}</p>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Bairro*"
                        aria-label="Bairro*"
                        name="bairro"
                        value={valoresFormulario.bairro}
                        onChange={handleChange}
                      />
                      {errors.bairro && (
                        <p style={{ color: "red" }}>{errors.bairro}</p>
                      )}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Logradouro* (Rua, Avenida...)"
                        aria-label="Logradouro* (Rua, Avenida...)"
                        name="logradouro"
                        value={valoresFormulario.logradouro}
                        onChange={handleChange}
                      />
                      {errors.logradouro && (
                        <p style={{ color: "red" }}>{errors.logradouro}</p>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Número*"
                        aria-label="Número*"
                        name="numero"
                        value={valoresFormulario.numero}
                        onChange={handleChange}
                      />
                      {errors.numero && (
                        <p style={{ color: "red" }}>{errors.numero}</p>
                      )}
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Complemento"
                        aria-label="Complemento"
                        name="complemento"
                        value={valoresFormulario.complemento}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="button" onClick={handleBuyOrder}>
                    Confirmar Pedido
                  </button>
                </form>
              </section>
            </>
          )}
        </div>

        <div className={`${styles.order} card`}>
          <div className={styles.titleOrder}>
            <h5>Dados da compra</h5>
          </div>

          <div className={styles.infoResumo}>
            {orderData?.type === "product" && (
              <>
                <span>
                  <p>Frete </p>
                  <p> {frete}</p>
                </span>
              </>
            )}

            {orderData?.type === "points" && (
              <>
                <span>
                  <p>Pontos atuais</p>
                  <p>{dataUser.current_points}</p>
                </span>

                <span>
                  <strong>Total de pontos</strong>
                  <strong>
                    {parseInt(dataUser.current_points) +
                      parseInt(orderData.points)}
                  </strong>
                </span>
              </>
            )}

            <span className={styles.spanTotal}>
              <p>Valor</p> <p>R$ {total}</p>
            </span>
          </div>
          <div className={styles.areaBtn}>
            <button type="button" disabled={false} onClick={handleBuyOrder}>
              Comprar
            </button>
          </div>
        </div>
      </section>
      <ModalPix
        isShow={showPix}
        setIsShow={setShowPix}
        imgQrCode={imgQrCode}
        qrCode={`https://formulaelivehub.netlify.app/`}
        setPayment={setPayment}
        type={orderData?.type}
        dataUser={dataUser}
        orderData={orderData}
      />
      <ModalCongradulations 
        isShow={payment}
        setIsShow={setPayment}
        setPayment={setPayment}
        type={orderData?.type}
      />
    </>
  );
}
