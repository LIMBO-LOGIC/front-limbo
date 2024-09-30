import { useState } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP
import styles from "./register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";
import { toast } from "react-toastify";
import { baseUrl } from "../../service/api";

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
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês começa de 0, então é necessário adicionar 1
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
      console.log(base64Image);
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
          console.log("Imagem carregada com sucesso:", response.data);
          console.log(response);
          console.log(response.data);

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
              if (error.status === 401) {
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
        });
    };

    const file = picture;
    fileToBase64(file)
      .then((base64) => {
        console.log(base64);
        uploadToCloudinary(base64);
      })
      .catch((error) => {
        console.error("Erro ao converter o arquivo em Base64:", error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister(event);
    }
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Carregando..."
      wrapperStyle={{ height: "100vh" }} // Estilo aplicado corretamente
      styles={{
        content: (base) => ({ ...base }), // Mantém os estilos padrão
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
            {/* {imagemPreview && (
            <img
              src={imagemPreview}
              alt="Pré-visualização"
              className={styles.previewImage}
            />
          )} */}
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
                disabled={isLoading} // Desabilita o campo durante o carregamento
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
                disabled={isLoading} // Desabilita o campo durante o carregamento
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
                disabled={isLoading} // Desabilita o campo durante o carregamento
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
                disabled={isLoading} // Desabilita o campo durante o carregamento
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
                disabled={isLoading} // Desabilita o campo durante o carregamento
              />
            </div>

            <Link to="/login" className={styles.itemMenu}>
              <p className={styles.conta}>
                Já tem conta? <span>Logue aqui</span>
              </p>
            </Link>

            {/* Exibe mensagem de erro, se houver */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <button
              className={styles.btn_login}
              onClick={handleRegister}
              disabled={isLoading} // Desabilita o botão enquanto carrega
            >
              {isLoading ? "Registrando..." : "Registrar"}
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
