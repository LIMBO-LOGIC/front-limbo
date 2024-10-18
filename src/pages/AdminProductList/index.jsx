import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = () => {
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

  return (
    <div className="container">
      <h2>Lista de Produtos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Pontos de Troca</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              onClick={() => {
                setProductId(product.id);
                setFormData({
                  name: product.name,
                  description: product.description,
                  change_points: product.change_points,
                  active: product.active,
                  image: product.image,
                  details: product.details,
                });
              }}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.change_points}</td>
              <td>{product.active ? "Sim" : "Não"}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click
                    setProductId(product.id);
                    handleDelete();
                  }}
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

export default ProductList;
