/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { QRCodeSVG } from "qrcode.react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./modalPix.module.css";
import { baseUrl } from "../../service/api";
import axios from "axios";
import useContexts from "../../hooks/useContext";

export default function ModalPix({
  isShow,
  qrCode,
  imgQrCode,
  setIsShow,
  setPayment,
  type,
  dataUser,
  orderData,
}) {
  const { setDataUser, setIsLoading } = useContexts();

  function copiarPix() {
    navigator.clipboard.writeText(qrCode).then(() => {
      toast.success("Código pix copiado!");
    });
  }

  const handleSucess = () => {
    setIsLoading(true);

    if (type != "product") {
      const body = {
        allPoints: parseInt(dataUser.all_points) + parseInt(orderData.points),
        currentPoints: parseInt(dataUser.current_points) + parseInt(orderData.points),
      };
      axios
        .put(`${baseUrl}/user/${dataUser.id}/points`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();

          const json = response.data.updatedUser;
          json.dateSalved = formattedDate;

          setDataUser(json);
          localStorage.setItem("userStorage", JSON.stringify(json));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const dataBody = {
        userId: dataUser.id,
        productId: orderData.id,
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
              Number(dataUser.current_points) - Number(orderData.change_points),
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
        });
    }

    setPayment(true);
    setIsShow(false);
  };

  return (
    <Modal
      show={isShow}
      onHide={!isShow}
      backdrop="static" // Impede o fechamento ao clicar fora da modal
      keyboard={false} // Impede o fechamento ao pressionar a tecla Esc
      dialogClassName="modal-dialog-centered modal-dialog-scrollable" // Adiciona classes ao dialog
    >
      <p className={`fs-5 mb-1 ${styles.title}`}>Scannear QRcode</p>
      <Modal.Body
        className={`paddingModal d-flex flex-column align-items-center w-100`}
      >
        <QRCodeSVG size={280} value={imgQrCode} />
        <div className="row px-5">
          <Button
            variant="primary"
            className="mt-4 px-5"
            onClick={handleSucess}
          >
            Concluir
          </Button>
          <button className="btn btn-secondary me-3 mt-3" onClick={copiarPix}>
            <MdContentCopy size={22} className="me-2" /> Copiar código pix
          </button>
          <Button
            variant="danger"
            className="mt-3 px-5"
            onClick={() => {
              setPayment(false);
              setIsShow(false);
            }}
          >
            Fechar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
