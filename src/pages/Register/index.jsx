import { useState } from "react";
import axios from "axios";
import styles from "./register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";
import { toast } from "react-toastify";
import { baseUrl } from "../../service/api";
import { auth, provider } from "../../firebaseConfig"; // Ajuste o caminho conforme necessário
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!picture) {
      setErrorMessage("Por favor, insira uma foto de perfil.");
      setIsLoading(false);
      return;
    }

    if (
      !picture ||
      !nomeCompleto ||
      !username ||
      !email ||
      !dataNascimento ||
      !senha
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    let publicID = `${email.split("@")[0]}-${getCurrentDate()}`;
    publicID = publicID[0] + publicID[1];

    function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    const uploadToCloudinary = (base64Image) => {
      const formData = new FormData();
      formData.append("file", base64Image);
      formData.append("upload_preset", "u38nm7ok");
      formData.append("folder", "");
      formData.append("resource_type", "image");
      formData.append("public_id", publicID);

      axios
        .post(
          "https://api.cloudinary.com/v1_1/drwk6ohcn/image/upload",
          formData
        )
        .then(async (response) => {
          const body = {
            fullname: nomeCompleto,
            nickname: username,
            email: email,
            birthdate: dataNascimento.replaceAll("-", "/"),
            password: senha,
            profile_picture: response.data.secure_url,
          };
          await axios
            .post(`${baseUrl}/user/register`, body, {
              headers: {
                "Content-Type": "application/json",
              },
            })
            .then(() => {
              toast.success("Cadastro realizado com sucesso!");
              navigate("/login");
            })
            .catch((error) => {
              if (error.response && error.response.status === 401) {
                toast.error("Email ou senha inválido!");
              } else {
                toast.error(
                  "Erro ao tentar fazer o cadastro. Tente novamente mais tarde."
                );
              }
              console.error("Erro de Cadastro:", error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error("Erro ao carregar a imagem:", error);
          setIsLoading(false);
        });
    };

    const file = picture;
    fileToBase64(file)
      .then((base64) => {
        uploadToCloudinary(base64);
      })
      .catch((error) => {
        console.error("Erro ao converter o arquivo em Base64:", error);
        setIsLoading(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister(event);
    }
  };

  // Função para registrar com Google
  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Aqui tratamos o caso em que o 'birthdate' não está disponível
      const body = {
        fullname: user.displayName,
        nickname: user.email.split("@")[0],
        email: user.email,
        birthdate: "1990/01/01", // Colocamos uma data padrão se não houver uma data de nascimento
        profile_picture: user.photoURL,
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
      // Tratamento de erro
      if (error.code) {
        toast.error(`Erro de autenticação: ${error.code}`);
      } else if (error.response && error.response.data) {
        toast.error(`Erro de cadastro: ${error.response.data.message}`);
      } else {
        toast.error("Erro ao tentar fazer o cadastro com Google.");
      }
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
      styles={{
        content: (base) => ({ ...base }),
      }}
    >
      <div className={styles.main_login}>
        <div onKeyDown={handleKeyPress} className={styles.left_login}>
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
                placeholder="Data de nascimento (dd/mm/yyyy)"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.textfield}>
              <input
                required
                type="password"
                name="senha"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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

            {/* Botão para registrar com Google */}
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
