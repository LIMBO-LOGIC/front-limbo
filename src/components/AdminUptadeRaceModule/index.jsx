import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateRaceModule = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState({
    race_date: "",
    country_flag: "",
    circuit_location: "",
    circuit_image: "",
    status: "A",
    round: 0,
  });

  const [updateData, setUpdateData] = useState(null); // Estado para dados da corrida a ser atualizada
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRace(id);
  }, [id]);

  // Você pode chamar essa função para obter a corrida a ser atualizada, se necessário
  const fetchRace = async (id) => {
    try {
      const response = await axios.get(
        `https://back-limbo-production.up.railway.app/racing/${id}`
      );
      setUpdateData(response.data);
      setFormData({
        race_date: response.data.race_date,
        country_flag: response.data.country_flag,
        circuit_location: response.data.circuit_location,
        circuit_image: response.data.circuit_image,
        status: response.data.status,
        round: response.data.round,
      });
    } catch (error) {
      console.error("Erro ao buscar corrida:", error);
      setModalMessage("Erro ao buscar corrida.");
      setShowModal(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateData) return; // Se não houver corrida para atualizar, retorna

    try {
      await axios.put(
        `https://back-limbo-production.up.railway.app/racing/${updateData.id_racing}`,
        formData
      );
      setModalMessage("Corrida atualizada com sucesso!");
      resetForm();
      setUpdateData(null); // Limpa dados de atualização
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao atualizar corrida:", error);
      setModalMessage("Erro ao atualizar corrida.");
      setShowModal(true);
    }
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
    <div className="container pt-4">
      <h2>Atualizar Corrida</h2>
      <form onSubmit={handleUpdate} className="mb-4 pt-3">
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

export default UpdateRaceModule;
