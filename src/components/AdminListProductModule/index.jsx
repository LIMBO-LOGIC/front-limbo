import axios from "axios";
import { useEffect, useState } from "react";
import Switch from "../Switch";
import { baseUrl } from "../../service/api";
import { Link, useNavigate } from "react-router-dom";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useContexts from "../../hooks/useContext";
import styles from "./adminListProductModule.module.css";
import AdminTitle from "../AdminTitle";
import { FiShoppingBag } from "react-icons/fi";

const ProductListModule = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { setIsLoadingAdmin } = useContexts();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    setIsLoadingAdmin(true);
    try {
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
    setIsLoadingAdmin(false);
  };

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: `Tem certeza que deseja excluir o produto "${name}"?`,
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#ADADAD",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${baseUrl}/products/${id}`);
      Swal.fire("Excluído!", "O produto foi excluído com sucesso.", "success");
      fetchProducts();
    } catch (error) {
      Swal.fire(
        "Erro ao deletar produto, tente novamente mais tarde!",
        "error"
      );
      console.error("Erro ao deletar produto:", error);
    }
  };

  const change_active = () => alert("Desativou");

  return (
    <div className="p-4">
      <AdminTitle
        text="Lista de Produtos"
        icon={<FiShoppingBag size={22} />}
      />
      <section className={`${styles.cardTable} pb-4 h-max card px-5`}>
        <div className="mt-3 mb-3 d-flex align-items-center justify-content-end">
          <Link
            to="/admin/createProduct"
            style={{ fontSize: "16px" }}
            className="btn btn-sm btn-primary btn-new-alter px-3 py-1 ms-auto"
          >
            Criar produto
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table caption-top">
            <thead className="table-dark">
              <tr>
                <th scope="col" className="col-md-2">
                  Nome
                </th>
                <th scope="col" className="col-md-5">
                  Descrição
                </th>
                <th
                  scope="col"
                  style={{ whiteSpace: "nowrap" }}
                  className="col"
                >
                  Pontos de Troca
                </th>
                <th scope="col" className="col">
                  Ativo
                </th>
                <th scope="col" className="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.change_points}</td>
                  <td>
                    <Switch check={product.active} onclick={change_active} />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning px-4 me-2 py-1"
                      onClick={() => {
                        navigate(`/admin/uptadeProduct/${product.id}`);
                      }}
                    >
                      <FaPen size={18} />
                    </button>
                    <button
                      className="btn btn-danger px-4 py-1"
                      onClick={() => {
                        handleDelete(product.id, product.name);
                      }}
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
    </div>
  );
};

export default ProductListModule;
