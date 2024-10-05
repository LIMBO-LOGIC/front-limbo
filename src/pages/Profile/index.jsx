/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./profile.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";
import axios from "axios";
import { baseUrl } from "../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setDataUser, dataUser, setIsLoading } = useContexts();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [products, setProducts] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));

    axios
      .get(`${baseUrl}/user/${userStorage.id}`)
      .then((response) => {
        setDataUser(response.data);
        setName(response.data.fullname);
        setEmail(response.data.email);
        setNickname(response.data.nickname);
        setProfilePicture(response.data.profile_picture);
        setBirthdate(response.data.birthdate.split("T")[0]);
      })
      .catch((error) => {
        toast.error("Usuário não encontrado, realize o login novamente!");
        navigate("/login");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, setIsLoading, setDataUser]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/product-rescues/${dataUser.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Usuário não encontrado, realize o login novamente!");
      })
      .finally(() => {
        setIsLoading(false);
      });

    axios
      .get(`${baseUrl}/favoriteProduct/${dataUser.id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setProducts, dataUser, setIsLoading]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));

    const updatedData = {
      fullname: name,
      nickname: nickname,
      birthdate: birthdate,
    };

    try {
      const response = await axios.put(
        `${baseUrl}/user/${userStorage.id}`,
        updatedData
      );
      setDataUser(response.data.updatedUser);
      toast.success("Perfil atualizado com sucesso!");
      setIsEdit(false);
    } catch (error) {
      toast.error("Erro ao atualizar o perfil. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));

    try {
      const response = await axios.put(
        `${baseUrl}/user/${userStorage.id}/password`,
        {
          oldPassword,
          newPassword,
        }
      );

      console.log(response.data); // Verifique se a resposta é a esperada
      toast.success("Senha alterada com sucesso!");
      setOldPassword("");
      setNewPassword("");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error.response); // Verifique a resposta de erro
      toast.error(
        "Erro ao alterar a senha. Verifique a senha atual e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.profile}>
      <PageTitle text={"Perfil"} />
      <form className={styles.boxMain}>
        <div className={`${styles.rowProfile} mb-5`}>
          <div className={styles.dataProfile}>
            <img
              src={profilePicture}
              className={styles.imgProfile}
              alt="Imagem de perfil"
            />
            <div className={styles.userProfile}>
              <p>{name}</p>
              <span>Pontos Totais: {dataUser.all_points} pontos</span>
              <span>Pontos Atuais: {dataUser.current_points} pontos</span>
            </div>
          </div>

          <div className={styles.btns}>
            <button
              className={styles.btnPassword}
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Alterar senha
            </button>
            {isEdit ? (
              <button
                className={styles.btnProfile}
                type="button"
                onClick={handleSave}
              >
                Salvar
              </button>
            ) : (
              <button
                className={styles.btnProfile}
                type="button"
                onClick={handleEdit}
              >
                Editar
              </button>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="fullName" className="form-label">
              Nome completo
            </label>
            <input
              type="text"
              disabled={!isEdit}
              required
              name="fullName"
              id="fullName"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <input
              type="text"
              disabled={!isEdit}
              required
              name="username"
              id="username"
              className="form-control"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              disabled
              required
              name="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="birthdate" className="form-label">
              Data de nascimento
            </label>
            <input
              type="date"
              disabled={!isEdit}
              required
              name="birthdate"
              id="birthdate"
              className="form-control"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div className={styles.boxProduct}>
        <h2 className={styles.title}>Produtos resgatados</h2>
        <ContainerProduct
        setFavorites={setFavorites}
        favorites={favorites}
          listItens={
            products != null
              ? products.map((product) => ({
                  ...product.product,
                  isFavorited: favorites.find((fav) => fav.product.id === product.product.id),
                }))
              : []
          }
        />
      </div>

      {/* Modal para Alterar Senha */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Alterar Senha</h3>
            <label htmlFor="oldPassword">Senha Atual</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleChangePassword}>Alterar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
