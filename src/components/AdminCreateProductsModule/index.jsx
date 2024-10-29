import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { baseUrl } from "../../service/api";

const CreateProductModule = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseUrl}/products`,
        formData
      );
      setModalMessage("Produto criado com sucesso!");
      fetchProducts();
      resetForm();
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      setModalMessage("Erro ao criar produto.");
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
    <div className="container">
      <h1 className="my-4">Gerenciar Produtos</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <h2>Criar Produto</h2>
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
        <button type="submit" className="btn btn-primary">
          Criar Produto
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

export default CreateProductModule;
