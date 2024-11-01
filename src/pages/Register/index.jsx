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

const Register = () => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!picture) {
      setErrorMessage("Por favor, insira uma foto de perfil.");
      setIsLoading(false);
      return;
    }

    if (!nomeCompleto || !username || !email || !dataNascimento) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Email inválido.");
      setIsLoading(false);
      return;
    }

    let publicID = `${email.split("@")[0]}-${new Date()
      .toISOString()
      .slice(0, 10)}`;

    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const uploadToCloudinary = (base64Image) => {
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append("upload_preset", "u38nm7ok");
      formData.append("folder", "");
      formData.append("resource_type", "image");
      formData.append("public_id", publicID);

      return axios.post(
        "https://api.cloudinary.com/v1_1/drwk6ohcn/image/upload",
        formData
      );
    };

    const file = picture;
    fileToBase64(file)
      .then((base64) => uploadToCloudinary(base64))
      .then(async (response) => {
        const body = {
          fullname: nomeCompleto,
          nickname: username,
          email: email,
          birthdate: dataNascimento.replaceAll("-", "/"),
          type_user: "user", // Adiciona o campo type_user
          profile_picture: response.data.secure_url,
        };

        console.log("Dados enviados para o servidor:", body);

        await axios.post(`${baseUrl}/user/register`, body, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Cadastro realizado com sucesso!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Erro de cadastro:", error);
        toast.error(
          "Erro ao tentar fazer o cadastro. Tente novamente mais tarde."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Obtém o token de autenticação do Firebase
      const token = await user.getIdToken();

      const body = {
        fullname: user.displayName || "Nome Padrão",
        nickname: user.email.split("@")[0],
        email: user.email,
        birthdate: "2006/12/03",
        type_user: "user",
        profile_picture: user.photoURL || "URL da foto padrão",
        firebase_token: token, // Adiciona o token ao backend
      };

      await axios.post(`${baseUrl}/user/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar com Google:", error);
      toast.error("Erro ao tentar fazer o cadastro com Google.");
    } finally {
      setIsLoading(false);
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
          <h5 className={styles.login_login}>Coloque a sua foto</h5>

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
            <div className={styles.textfield}>
              <input
                required
                type="text"
                name="nomeCompleto"
                placeholder="Nome Completo"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.textfield}>
              <input
                required
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.textfield}>
              <input
                required
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.textfield}>
              <input
                required
                type="date"
                name="dataNascimento"
                placeholder="Data de nascimento"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Link to="/login" className={styles.itemMenu}>
              <p className={styles.conta}>
                Já tem conta? <span>Logue aqui</span>
              </p>
            </Link>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button
              className={styles.btn_login}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrar"}
            </button>

            <button
              className={styles.btn_google}
              onClick={handleGoogleRegister}
              disabled={isLoading}
            >
              Registrar com Google
            </button>
          </div>
        </div>

        <div className={styles.right_login}>
          <img src={imagem_direita} className={styles.image} alt="Animação" />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Register;
