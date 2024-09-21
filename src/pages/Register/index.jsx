import React, { useState } from "react";
import axios from "axios"; // Importando axios para fazer requisições HTTP
import styles from "./Register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";

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

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validar = async () => {
    setErrorMessage("");

    // Validação simples dos campos
    if (!nomeCompleto || !username || !email || !dataNascimento || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); // Desabilitar o botão enquanto carrega

    try {
      // Fazendo a requisição POST para o servidor com axios
      const response = await axios.post("http://localhost:3000/register", {
        nomeCompleto,
        username,
        email,
        dataNascimento,
        senha,
        picture, // Imagem do usuário
      });

      if (response.data.success) {
        console.log("Registro bem-sucedido:", response.data);
        // Aqui você pode redirecionar para a tela de login ou outra página
      } else {
        setErrorMessage("Falha no registro. Tente novamente.");
      }
    } catch (error) {
      setErrorMessage("Erro ao registrar. Tente novamente mais tarde.");
      console.error("Erro de registro:", error);
    } finally {
      setLoading(false); // Reabilita o botão após a requisição
    }
  };

  return (
    <div className={styles.main_login}>
      <div className={styles.left_login}>
        <h2 className={styles.login_login}>Registre-se</h2>

        {/* Input de imagem com pré-visualização */}
        <div className={styles.imagem_input}>
          <UploadPhotoUser
            value={picture}
            onChange={(file) => {
              setPicture(file);
              handleImageChange(file); // Atualiza a pré-visualização da imagem
            }}
          />
          {imagemPreview && (
            <img
              src={imagemPreview}
              alt="Pré-visualização"
              className={styles.previewImage}
            />
          )}
        </div>

        <div className={styles.card_usuario}>
          <div className={styles.textfield}>
            <input
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
              type="text"
              name="dataNascimento"
              placeholder="Data de nascimento (dd/mm/yyyy)"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              disabled={loading} // Desabilita o campo durante o carregamento
            />
          </div>

          <div className={styles.textfield}>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading} // Desabilita o campo durante o carregamento
            />
          </div>

          {/* Exibe mensagem de erro, se houver */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <button
            className={styles.btn_login}
            onClick={validar}
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
  );
};

export default Register;
