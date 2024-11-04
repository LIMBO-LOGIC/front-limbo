import { useState } from "react";
import axios from "axios";
import styles from "./login.module.css";
import imagem_login from "../../assets/tela_login_imagem.png";
import logo from "/assets/logo_formulaE_branca.png";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../service/api";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";
import LoadingOverlay from "react-loading-overlay-ts";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { auth, provider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
        navigate("/race"); // Redireciona sempre para a tela "race"
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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const body = {
        email: user.email,
        password: token,
      };

      // Primeiro, verifique se o usuário já está cadastrado
      const response = await axios.post(`${baseUrl}/user/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.exists) {
        // Usuário já existe, prossiga com o login
        const userData = {
          fullname: response.data.fullname || user.displayName || "Nome Padrão",
          nickname: response.data.nickname || user.email.split("@")[0],
          email: user.email,
          dateSaved: new Date().toISOString(),
          profile_picture:
            response.data.profile_picture ||
            user.photoURL ||
            "URL da foto padrão",
          type_user: "user",
        };

        setDataUser(userData);
        localStorage.setItem("userStorage", JSON.stringify(userData));
        navigate("/race");
        toast.success("Login realizado com sucesso!");
      } else {
        // Verifique se o email ou nickname já estão em uso
        try {
          await axios.post(`${baseUrl}/user/check-existence`, {
            email: user.email,
            nickname: user.email.split("@")[0],
          });

          // Se não houver erro, então registre
          const newBody = {
            fullname: user.displayName || "Nome Padrão",
            nickname: user.email.split("@")[0],
            email: user.email,
            birthdate: "2006/12/03", // Pode ser alterado conforme necessário
            password: token,
            profile_picture: user.photoURL || "URL da foto padrão",
            type_user: "user",
          };

          await axios.post(`${baseUrl}/user/register`, newBody, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          toast.success("Cadastro realizado com sucesso!");

          const userData = {
            fullname: newBody.fullname,
            nickname: newBody.nickname,
            email: newBody.email,
            dateSaved: new Date().toISOString(),
            profile_picture: newBody.profile_picture,
            type_user: "user",
          };

          setDataUser(userData);
          localStorage.setItem("userStorage", JSON.stringify(userData));
          navigate("/race");
        } catch (checkError) {
          if (checkError.response && checkError.response.status === 409) {
            toast.error("Email ou nickname já estão em uso.");
          } else {
            toast.error("Erro ao verificar existência do usuário.");
          }
        }
      }
    } catch (error) {
      console.error("Erro ao autenticar com Google:", error);
      toast.error("Erro ao tentar fazer login com Google.");
    } finally {
      setIsLoading(false);
    }
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
                className={styles.eyeIcon}
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

            <button
              className={styles.btnGoogle}
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              Login com Google
            </button>
          </form>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Login;
