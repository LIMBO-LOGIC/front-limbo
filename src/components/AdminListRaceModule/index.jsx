import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../service/api";
import { FaFlagCheckered, FaPen, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useContexts from "../../hooks/useContext";
import styles from './adminListRaceModule.module.css'
import AdminTitle from "../AdminTitle";

const ListRaceModule = () => {
  const [races, setRaces] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setIsLoadingAdmin } = useContexts();

  useEffect(() => {
    fetchRaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRaces = async () => {
    setIsLoadingAdmin(true);
    try {
      const response = await axios.get(`${baseUrl}/racing`);
      console.log(response.data);
      setRaces(response.data);
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
    }
    setIsLoadingAdmin(false);
  };

  const handleDelete = async (id, race) => {
    Swal.fire({
      title: `Tem certeza que deseja excluir a corrida "${race}"?`,
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ADADAD",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRace(id);
      }
    });
  };

  const deleteRace = async (id) => {
    try {
      await axios.delete(`${baseUrl}/racing/${id}`);
      Swal.fire("Excluído!", "A corrida foi excluída com sucesso.", "success");
      fetchRaces();
    } catch (error) {
      console.error("Erro ao deletar corrida:", error);
      setModalMessage("Erro ao deletar corrida.");
      setShowModal(true);
    }
  };

  function formatarDataISO(dataISO) {
    const data = new Date(dataISO);

    // Ajustando para o horário local
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano}, ${horas}:${minutos}`;
  }

  return (
    <div className="p-4">
      <AdminTitle text='Lista de Corridas' icon={<FaFlagCheckered size={22}/>}/>
      <section className={`${styles.cardTable} pb-4 h-max card px-5`}>
        <div className="mt-3 mb-3 d-flex align-items-center justify-content-end">
          <Link to="/admin/createRace" style={{fontSize: '16px'}} className="btn btn-sm btn-primary btn-new-alter px-3 py-1 ms-auto">
            Criar corrida
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table caption-top">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="col">
                  Localização
                </th>
                <th scope="col" className="col">
                  Data/Hora
                </th>
                <th scope="col" className="col">
                  Rodada
                </th>
                <th scope="col" className="col" width="20%">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => (
                <tr key={race.id_racing}>
                  <td>{race.circuit_location}</td>
                  <td>{formatarDataISO(race.race_date)}</td>
                  <td>{race.round}</td>
                  <td>
                    <button
                      className="btn btn-warning px-4 me-2 py-1"
                      onClick={() => {
                        navigate(`/admin/uptadeRace/${race.id_racing}`);
                      }}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      className="btn btn-danger px-4 py-1"
                      onClick={() =>
                        handleDelete(race.id_racing, race.circuit_location)
                      }
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* <div className="mt-3 mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-7">Lista de Corridas</h2>
      </div> */}

      {/* Modal de Mensagem */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mensagem</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{modalMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListRaceModule;
