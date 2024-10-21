import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const ListRaceModule = () => {
  const [races, setRaces] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRaces();
  }, []);

  const fetchRaces = async () => {
    try {
      const response = await axios.get(
        "https://back-limbo-production.up.railway.app/racing"
      );
      setRaces(response.data);
    } catch (error) {
      console.error("Erro ao buscar corridas:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://back-limbo-production.up.railway.app/racing/${id}`
      );
      setModalMessage("Corrida deletada com sucesso!");
      fetchRaces(); // Atualiza a lista após a exclusão
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao deletar corrida:", error);
      setModalMessage("Erro ao deletar corrida.");
      setShowModal(true);
    }
  };

  return (
    <div className="container">
      <h2>Lista de Corridas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Localização</th>
            <th>Rodada</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.id_racing}>
              <td>{race.id_racing}</td>
              <td>{new Date(race.race_date).toLocaleString()}</td>
              <td>{race.circuit_location}</td>
              <td>{race.round}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(race)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(race.id_racing)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
