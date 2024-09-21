/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios"; // Importando axios para requisições HTTP
import styles from "./Login.module.css";
import imagem_login from "../../assets/tela_login_imagem.png";
import logo from "../../../public/assets/logo_formulaE_branca.png";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../service/api";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validar = async () => {
    setErrorMessage("");

    if (!usuario || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if(usuario == 'luyz.gusta' && senha == '1234'){
      const jsonUser = {
        user_id: 1,
        email: 'luyz.gusta@gmail.com',
        name: 'Luiz Gustavo',
        nickname: 'luyz.gusta',
        birthdate: '15/02/2006',
        all_points: 180,
        current_points: 190,
        image_user: 'https://res.cloudinary.com/drwk6ohcn/image/upload/v1726942954/luyz-1.jpg'
      }

      localStorage.setItem("userStorage", JSON.stringify(jsonUser));
      navigate('/race')
    }

    // setLoading(true);

    // try {
    //   const body = {
    //     nickname: usuario,
    //     password: senha
    //   }

    //   const response = await axios.post( baseUrl + "/user/login", body);

    //   if (response.data.success) {
    //     console.log("Login bem-sucedido:", response.data);
    //   } else {
    //     setErrorMessage("Usuário ou senha incorretos.");
    //   }
    // } catch (error) {
    //   setErrorMessage(
    //     "Erro ao tentar fazer login. Tente novamente mais tarde."
    //   );
    //   console.error("Erro de login:", error);
    // } finally {
    //   setLoading(false);
    // }
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
