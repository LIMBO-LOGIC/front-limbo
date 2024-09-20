import React, { useState } from "react";
import axios from "axios"; // Importando axios para requisições HTTP
import styles from "./Login.module.css";
import imagem_login from "../../assets/tela_login_imagem.png";
import logo from "../../../public/assets/logo_formulaE_branca.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para gerenciar o carregamento

  const validar = async () => {
    setErrorMessage(""); // Resetando a mensagem de erro

    // Validação simples de campos
    if (!usuario || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); // Desabilita o botão durante o carregamento

    try {
      // Fazendo uma requisição POST para autenticar o usuário
      const response = await axios.post("http://localhost:3000/login", {
        usuario,
        senha,
      });

      // Sucesso na autenticação
      if (response.data.success) {
        console.log("Login bem-sucedido:", response.data);
        // Aqui você pode redirecionar ou atualizar o estado do usuário logado
      } else {
        setErrorMessage("Usuário ou senha incorretos.");
      }
    } catch (error) {
      setErrorMessage(
        "Erro ao tentar fazer login. Tente novamente mais tarde."
      );
      console.error("Erro de login:", error);
    } finally {
      setLoading(false); // Reabilita o botão após a requisição
    }
  };

  return (
    <div className={styles.main_login}>
      <div className={styles.left_login}>
        <img src={imagem_login} className={styles.image} alt="Animação" />
      </div>

      <div className={styles.right_login}>
        <img src={logo} className={styles.image} alt="Animação" />
        <h2 className={styles.login_login}>Login</h2>
        <div className={styles.card_usuario}>
          <div className={styles.textfield}>
            <input
              type="text"
              name="usuario"
              placeholder="Usuário"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              disabled={loading} // Desabilita o campo enquanto carrega
            />
          </div>

          <div className={styles.textfield}>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading} // Desabilita o campo enquanto carrega
            />
          </div>

          {/* Exibe mensagem de erro, se houver */}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <Link to="/register" className={styles.itemMenu}>
            <p className={styles.conta}>
              Ainda não tem conta? <span>Cadastra-se aqui</span>
            </p>
          </Link>

          <button
            className={styles.btn_login}
            onClick={validar}
            disabled={loading} // Desabilita o botão durante o carregamento
          >
            {loading ? "Carregando..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
