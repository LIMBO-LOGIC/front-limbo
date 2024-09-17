import { useState } from "react";
import styles from "./profile.module.css";
import imgProfile from "../../assets/user_profile.png";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    setIsEdit(isEdit);
  };

  return (
    <section className={styles.profile}>
      <PageTitle text={'Perfil'}/>
      <form className={styles.boxMain}>
        <div className={`${styles.rowProfile} mb-5`}>
          <div className={`${styles.dataProfile}`}>
            <img
              src={imgProfile}
              className={styles.imgProfile}
              alt="Imagem de perfil"
            />
            <div className={styles.userProfile}>
              <p>Luiz Gustavo</p>
              <span>120 pontos</span>
            </div>
          </div>

          {isEdit ? (
            <div className={styles.btns}>
              <button
                className={`${styles.btnPassword}`}
                type="button"
                onClick={handleEdit}
              >
                Alterar senha
              </button>
              <button
                className={styles.btnProfile}
                style={{ backgroundColor: "#0054FF " }}
                type="button"
                onClick={handleSave}
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className={styles.btns}>
              <button
                className={`${styles.btnPassword}`}
                type="button"
                onClick={handleEdit}
              >
                Alterar senha
              </button>
              <button
                className={styles.btnProfile}
                type="button"
                onClick={handleEdit}
              >
                Editar
              </button>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="fullName" className="form-label">
              Nome completo
            </label>
            <input
              type="text"
              disabled={!isEdit}
              required
              name="fullName"
              id="fullName"
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <input
              type="text"
              disabled={!isEdit}
              required
              name="username"
              id="username"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              disabled
              required
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-4">
            <label htmlFor="" className="form-label">
              Data de nascimento
            </label>
            <input
              type="date"
              disabled={!isEdit}
              required
              name=""
              id=""
              className="form-control"
            />
          </div>
        </div>
      </form>
      <div className={styles.boxProduct}>
        <h2 className={styles.title}>Produtos resgatados</h2>
        <ContainerProduct listItens={['teste']} />
      </div>
    </section>
  );
}
