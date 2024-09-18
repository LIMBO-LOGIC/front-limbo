import React from "react";
import styles from "./Login.module.css";
import imagem_login from "../../assets/tela_login_imagem.png";
import logo from "../../../public/assets/logo_formulaE_branca.png";
import { Link } from "react-router-dom";
const Login = () => {
  const validar = () => {
    // Função de validação aqui
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
            />
          </div>

          <div className={styles.textfield}>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              id="senha"
            />
          </div>
          <Link to="/register" className={styles.itemMenu}>
            <p className={styles.conta}>
              Ainda não tem conta? <span>Cadastra-se aqui</span>
            </p>
          </Link>
          <button className={styles.btn_login} onClick={validar}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
