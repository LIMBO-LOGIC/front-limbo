import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";
import { toast } from "react-toastify";
import { baseUrl } from "../../service/api";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState(""); // Senha que o usuário digitará no modal
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Estado do modal de senha
  const [googleUser, setGoogleUser] = useState(null); // Estado para armazenar dados do Google

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setGoogleUser(user); // Armazena dados do usuário do Google
      setShowPasswordModal(true); // Mostra o modal para solicitar a senha
    } catch (error) {
      console.error("Erro ao registrar com Google:", error);
      toast.error("Erro ao tentar fazer o cadastro com Google.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para enviar os dados ao backend após o usuário fornecer a senha no modal
  const handleSubmitWithPassword = async () => {
    if (!senha) {
      toast.error("Por favor, insira uma senha.");
      return;
    }

    setIsLoading(true);

    const body = {
      fullname: googleUser.displayName || "Nome Padrão", // Nome completo do usuário
      nickname: googleUser.email.split("@")[0], // Gerar o nickname a partir do email
      email: googleUser.email, // Email do Google
      birthdate: "2006/12/03", // Data de nascimento padrão
      password: senha, // Senha fornecida pelo usuário
      profile_picture: googleUser.photoURL || "URL da foto padrão", // URL da foto ou uma base64 se preferir
    };

    console.log(
      "Dados enviados para o servidor ao registrar com Google:",
      body
    );

    try {
      await axios.post(`${baseUrl}/user/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar com Google:", error);
      if (error.response) {
        console.log("Erro do servidor:", error.response.data);
        if (error.response.data.message) {
          toast.error(`Erro de cadastro: ${error.response.data.message}`);
        }
      } else {
        toast.error("Erro ao tentar fazer o cadastro.");
      }
    } finally {
      setIsLoading(false);
      setShowPasswordModal(false); // Fecha o modal
    }
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Carregando..."
      wrapperStyle={{ height: "100vh" }}
    >
      <div className={styles.main_login}>
        <div className={styles.left_login}>
          <h2 className={styles.login_login}>Registre-se</h2>

          <div className={styles.imagem_input}>
            <UploadPhotoUser
              value={picture}
              onChange={(file) => {
                setPicture(file);
                handleImageChange(file);
              }}
            />
          </div>

          <div className={styles.card_usuario}>
            <Link to="/login" className={styles.itemMenu}>
              <p className={styles.conta}>
                Já tem conta? <strong>Entre aqui!</strong>
              </p>
            </Link>

            <div className={styles.botao}>
              <button
                className={styles.btn_register}
                onClick={handleGoogleRegister}
                disabled={isLoading}
              >
                Registrar com Google 8
              </button>
            </div>
          </div>
        </div>

        <div className={styles.right_login}>
          <img src={imagem_direita} alt="imagem_login" />
        </div>

        {/* Modal de senha */}
        <Modal
          show={showPasswordModal}
          onHide={() => setShowPasswordModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Insira sua senha</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPasswordModal(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSubmitWithPassword}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </LoadingOverlay>
  );
};

export default Register;
