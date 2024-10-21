import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UptadeProductModule = () => {
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
        "https://back-limbo-production.up.railway.app/products"
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
        "https://back-limbo-production.up.railway.app/products",
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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://back-limbo-production.up.railway.app/products/${productId}`
      );
      setModalMessage("Produto deletado com sucesso!");
      fetchProducts();
      setProductId("");
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      setModalMessage("Erro ao deletar produto.");
      setShowModal(true);
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

  const handleProductSelect = (product) => {
    setProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      change_points: product.change_points,
      active: product.active,
      image: product.image,
      details: product.details,
    });
  };

  return (
    <div className="container">
      <h2>Atualizar Produto</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="mb-4"
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="ID do Produto"
            value={productId}
            readOnly
          />
        </div>
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
