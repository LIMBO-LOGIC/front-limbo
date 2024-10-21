import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../service/api";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListRaceModule = () => {
  const [races, setRaces] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = async () => {
    try {
      const response = await axios.get(`${baseUrl}/racing`);
      console.log(response.data);
      setRaces(response.data);
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/racing/${id}`);
      setModalMessage("Corrida deletada com sucesso!");
      fetchRaces(); // Atualiza a lista após a exclusão
      setShowModal(true);
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
    <div className="container-sm px-4">
      <div className="mt-3 mb-3 d-flex align-items-center justify-content-between">
        <h2 className="fs-7">Lista de Corridas</h2>
        <Link to="/admin/createRace" className="btn btn-lg btn-primary">Criar corrida</Link>
      </div>
      <div className="table-responsive">
        <table className="table table-hover caption-top">
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
                    onClick={() => {}}
                  >
                    <FaPen size={18} />
                  </button>
                  <button
                    className="btn btn-danger px-4 py-1"
                    onClick={() => handleDelete(race.id_racing)}
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
