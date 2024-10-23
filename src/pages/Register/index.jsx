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
  const [senha, setSenha] = useState(""); // Campo de senha
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

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email); // Validação simples de email

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!picture) {
      setErrorMessage("Por favor, insira uma foto de perfil.");
      setIsLoading(false);
      return;
    }

    if (!nomeCompleto || !username || !email || !dataNascimento || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Email inválido.");
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

          console.log("Dados enviados para o servidor:", body); // Log dos dados enviados

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
              console.error("Erro de Cadastro:", error);
              if (error.response) {
                console.log("Erro do servidor:", error.response.data); // Detalhes do erro
                if (error.response.data.message) {
                  toast.error(
                    `Erro de cadastro: ${error.response.data.message}`
                  );
                } else {
                  toast.error("Erro de cadastro. Verifique os dados enviados.");
                }
              } else {
                toast.error(
                  "Erro ao tentar fazer o cadastro. Tente novamente mais tarde."
                );
              }
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

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Validar se a senha foi fornecida
      if (!senha) {
        toast.error("Por favor, insira uma senha.");
        setIsLoading(false);
        return;
      }

      // Definir o corpo da requisição com a senha fornecida
      const body = {
        fullname: user.displayName || "Nome Padrão", // Nome completo do usuário
        nickname: user.email.split("@")[0], // Gerar o nickname a partir do email
        email: user.email, // Email do Google
        birthdate: "2006/12/03", // Data de nascimento padrão
        password: senha, // Senha fornecida pelo usuário
        profile_picture: user.photoURL || "URL da foto padrão", // URL da foto ou uma base64 se preferir
      };

      console.log(
        "Dados enviados para o servidor ao registrar com Google:",
        body
      );

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
        console.log("Erro do servidor:", error.response.data); // Detalhes do erro
        if (error.response.data.message) {
          toast.error(`Erro de cadastro: ${error.response.data.message}`);
        }
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
                Já tem conta? <strong>Entre aqui!</strong>
              </p>
            </Link>

            <div className={styles.botao}>
              <button
                className={styles.btn_register}
                onClick={handleRegister}
                disabled={isLoading}
              >
                Registrar-se
              </button>
            </div>

            <div className={styles.google}>
              <button
                className={styles.btn_google}
                onClick={handleGoogleRegister}
                disabled={isLoading}
              >
                Registrar com Google
              </button>
            </div>
          </div>
        </div>

        <div className={styles.right_login}>
          <img src={imagem_direita} alt="imagem_login" />
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Register;
