import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../service/api";
import useContexts from "../../hooks/useContext";

const Register = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [profile_picture, setProfilePicture] = useState("");
  const { setDataUser } = useContexts();

  const handleGoogleRegister = async (token) => {
    const body = {
      fullname,
      nickname,
      email,
      birthdate,
      password: token, // Usando o token do Firebase como senha
      profile_picture,
      type_user: "user", // Definindo o tipo de usuário como "user"
    };

    try {
      const response = await axios.post(`${baseUrl}/user/register`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registro realizado com sucesso!");
      const userData = response.data.user;
      setDataUser(userData);
      localStorage.setItem("userStorage", JSON.stringify(userData));

      // Redirecionar para a tela "/race"
      navigate("/race");
    } catch (error) {
      console.error("Erro ao registrar com Google:", error);
      toast.error("Erro ao registrar com Google. Tente novamente.");
    }
  };

  // Função de login do Google
  const handleGoogleLogin = async () => {
    // Aqui você chamaria o método do Firebase para obter o token
    const token = await getFirebaseToken(); // Suponha que esta função obtenha o token do Firebase
    handleGoogleRegister(token);
  };

  return (
    <div>
      <h2>Registrar</h2>
      {/* Formulário de registro */}
      <input
        type="text"
        placeholder="Nome completo"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apelido"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="date"
        placeholder="Data de Nascimento"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da Imagem de Perfil"
        value={profile_picture}
        onChange={(e) => setProfilePicture(e.target.value)}
      />
      <button onClick={handleGoogleLogin}>Registrar com Google</button>
    </div>
  );
};

export default Register;
