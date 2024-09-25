import { useState } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP
import styles from "./Register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";
import cloudinary from "../../service/cloudinary";

const cloudName = 'drwk6ohcn'

const Register = () => {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [picture, setPicture] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const clientCloudinary = cloudinary

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // setIsLoading(true);
    // if (!nomeCompleto || !username || !email || !dataNascimento || !senha) {
    //   setErrorMessage("Por favor, preencha todos os campos.");
    //   setIsLoading(false);
    //   return;
    // }

    // const publicID = email.split('@')[0]
    const publicID = 'testecloud'
    cloudinary.image(publicID)

    const uploadImage = async (fileImg) => {
      const formData = new FormData();
      formData.append("file", fileImg);
      formData.append("upload_preset", 'up_img');
    
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
          formData
        );
        console.log(response);
        return response.data.public_id; 
      } catch (error) {
        console.error("Erro ao fazer upload:", error);
      }
    };

    uploadImage(picture)



    // const body = {
    //   fullname: nomeCompleto,
    //   nickname: username,
    //   email: email,
    //   birthdate: dataNascimento,
    //   password: senha,
    //   profile_picture: "",
    // };

    setLoading(true);

    // const response = await axios.post("http://localhost:3000/register", {
    //   nomeCompleto,
    //   username,
    //   email,
    //   dataNascimento,
    //   senha,
    //   picture, // Imagem do usuário
    // });
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
                disabled={loading} // Desabilita o campo durante o carregamento
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
                disabled={loading} // Desabilita o campo durante o carregamento
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
                disabled={loading} // Desabilita o campo durante o carregamento
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
                disabled={loading} // Desabilita o campo durante o carregamento
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
                disabled={loading} // Desabilita o campo durante o carregamento
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
              disabled={loading} // Desabilita o botão enquanto carrega
            >
              {loading ? "Registrando..." : "Registrar"}
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
