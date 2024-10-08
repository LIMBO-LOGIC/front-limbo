import { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import imagem_login from "../../assets/tela_login_imagem.png";
import logo from "../../../public/assets/logo_formulaE_branca.png";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../service/api";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";
import LoadingOverlay from "react-loading-overlay-ts";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Importando ícones

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const { setDataUser } = useContexts();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    setIsLoading(true);
    if (!usuario || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    const body = {
      nickname: usuario,
      password: senha,
    };

    await axios
      .post(`${baseUrl}/user/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (window.innerWidth >= 768) {
          toast.success("Login realizado com sucesso!");
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();

        let json = response.data.user;
        json.dateSalved = formattedDate;

        setDataUser(json);
        localStorage.setItem("userStorage", JSON.stringify(json));
        navigate("/race");
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Usuário ou senha inválido!");
        } else {
          toast.error(
            "Erro ao tentar fazer login. Tente novamente mais tarde."
          );
        }
        console.error("Erro de login:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
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
        <div className={styles.left_login}>
          <img src={imagem_login} className={styles.image} alt="Animação" />
        </div>

        <div className={styles.right_login}>
          <img src={logo} className={styles.image} alt="Animação" />
          <h2 className={styles.login_login}>Login</h2>
          <form className={styles.card_usuario} onKeyDown={handleKeyPress}>
            <div className={styles.textfield}>
              <input
                type="text"
                name="usuario"
                placeholder="Usuário"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className={styles.textfield}>
              <input
                type={showPassword ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isLoading}
              />
              <span
                className={styles.eyeIcon} // Altere para usar a classe CSS definida
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Link to="/register" className={styles.itemMenu}>
              <p className={styles.conta}>
                Ainda não tem conta? <span>Cadastra-se aqui</span>
              </p>
            </Link>
            <Link to="/" className={styles.itemMenu}>
              <p className={styles.conta}>
                Voltar para <span> tela principal</span>
              </p>
            </Link>

            <button
              className={styles.btn_login}
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
