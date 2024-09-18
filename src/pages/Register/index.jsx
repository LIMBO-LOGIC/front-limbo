import React, { useState } from "react";
import styles from "./Register.module.css";
import imagem_direita from "../../assets/tela_registro.svg";
import UploadPhotoUser from "./UploadPhotoUser";

const Register = () => {
  const [imagemPreview, setImagemPreview] = useState(null);
  const [picture, setPicture] = useState("");

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validar = () => {
    // Função de validação aqui
  };

  return (
    <div className={styles.main_login}>
      <div className={styles.left_login}>
        <h2 className={styles.login_login}>Registre-se</h2>

        {/* Input de imagem com pré-visualização */}
        <div className={styles.imagem_input}>
          <UploadPhotoUser
            value={picture}
            onChange={(file) => setPicture(file)}
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
              name="usuario"
              placeholder="Nome Completo"
              id="usuario"
            />
          </div>
          <div className={styles.textfield}>
            <input
              type="text"
              name="usuario"
              placeholder="Username"
              id="usuario"
            />
          </div>
          <div className={styles.textfield}>
            <input
              type="text"
              name="usuario"
              placeholder="Email"
              id="usuario"
            />
          </div>
          <div className={styles.textfield}>
            <input
              type="text"
              name="usuario"
              placeholder="Data de nascimento (dd/mm/yyyy)"
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
          <button className={styles.btn_login} onClick={validar}>
            Registrar
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
