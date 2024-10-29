import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useContexts from "../../hooks/useContext";

const UptadeProductModule = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    change_points: "",
    active: true,
    image: "",
    details: "",
  });
  const [productId, setProductId] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setIsLoadingAdmin } = useContexts();


  useEffect(() => {
    fetchProducts(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProducts = async (id) => {
    setIsLoadingAdmin(true)
    try {
      const response = await axios.get(
        `https://back-limbo-production.up.railway.app/products/${id}`
      );
      console.log(response);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        change_points: response.data.change_points,
        active: response.data.active,
        image: response.data.image,
        details: response.data.details,
      });
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoadingAdmin(false)
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://back-limbo-production.up.railway.app/products/${productId}`,
        formData
      );
      setModalMessage("Produto atualizado com sucesso!");
      fetchProducts();
      resetForm();
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setModalMessage("Erro ao atualizar produto.");
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      change_points: "",
      active: true,
      image: "",
      details: "",
    });
    setProductId("");
  };

  return (
    <div className="container pt-4">
      <h2>Atualizar Produto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="mb-4 pt-3"
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Pontos de Troca"
            value={formData.change_points}
            onChange={(e) =>
              setFormData({ ...formData, change_points: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Imagem (base64)"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Detalhes"
            value={formData.details}
            onChange={(e) =>
              setFormData({ ...formData, details: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Atualizar Produto
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

export default UptadeProductModule;
