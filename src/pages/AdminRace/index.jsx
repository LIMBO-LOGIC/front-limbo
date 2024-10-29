import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const CreateRaceAll = () => {
  const [formData, setFormData] = useState({
    race_date: "",
    country_flag: "",
    circuit_location: "",
    circuit_image: "",
    status: "A",
    round: 1,
  });

  const [updateData, setUpdateData] = useState(null); // Estado para dados da corrida a ser atualizada
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://back-limbo-production.up.railway.app/racing",
        formData
      );
      setModalMessage("Corrida criada com sucesso!");
      resetForm();
      fetchRaces(); // Atualiza a lista de corridas
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao criar corrida:", error);
      setModalMessage("Erro ao criar corrida.");
      setShowModal(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateData) return; // Se não houver corrida para atualizar, retorna

    try {
      await axios.put(
        `${baseUrl}/racing/${updateData.id_racing}`,
        formData
      );
      setModalMessage("Corrida atualizada com sucesso!");
      resetForm();
      setUpdateData(null); // Limpa dados de atualização
      fetchRaces(); // Atualiza a lista de corridas
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao atualizar corrida:", error);
      setModalMessage("Erro ao atualizar corrida.");
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${baseUrl}/racing/${id}`
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

  const handleEdit = (race) => {
    setUpdateData(race); // Armazena dados da corrida selecionada para edição
    setFormData({
      race_date: race.race_date,
      country_flag: race.country_flag,
      circuit_location: race.circuit_location,
      circuit_image: race.circuit_image,
      status: race.status,
      round: race.round,
    });
  };

  const resetForm = () => {
    setFormData({
      race_date: "",
      country_flag: "",
      circuit_location: "",
      circuit_image: "",
      status: "A",
      round: 1,
    });
    setUpdateData(null); // Limpa dados de atualização
  };

  return (
    <div className="container">
      <h1 className="my-4">Criar Corrida</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Formulário para criar uma corrida */}
        <div className="mb-3">
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Data da Corrida"
            value={formData.race_date}
            onChange={(e) =>
              setFormData({ ...formData, race_date: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Bandeira do País"
            value={formData.country_flag}
            onChange={(e) =>
              setFormData({ ...formData, country_flag: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Localização do Circuito"
            value={formData.circuit_location}
            onChange={(e) =>
              setFormData({ ...formData, circuit_location: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Imagem do Circuito (URL)"
            value={formData.circuit_image}
            onChange={(e) =>
              setFormData({ ...formData, circuit_image: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Rodada"
            value={formData.round}
            onChange={(e) =>
              setFormData({ ...formData, round: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Criar Corrida
        </button>
      </form>

      {/* Tabela de Corridas Existentes */}
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

      {/* Formulário de Atualização sempre visível */}
      <h2>Atualizar Corrida</h2>
      <form onSubmit={handleUpdate} className="mb-4">
        <div className="mb-3">
          <input
            type="datetime-local"
            className="form-control"
            placeholder="Data da Corrida"
            value={formData.race_date}
            onChange={(e) =>
              setFormData({ ...formData, race_date: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Bandeira do País"
            value={formData.country_flag}
            onChange={(e) =>
              setFormData({ ...formData, country_flag: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Localização do Circuito"
            value={formData.circuit_location}
            onChange={(e) =>
              setFormData({ ...formData, circuit_location: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Imagem do Circuito (URL)"
            value={formData.circuit_image}
            onChange={(e) =>
              setFormData({ ...formData, circuit_image: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Rodada"
            value={formData.round}
            onChange={(e) =>
              setFormData({ ...formData, round: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Atualizar Corrida
        </button>
      </form>

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

export default CreateRaceAll;
