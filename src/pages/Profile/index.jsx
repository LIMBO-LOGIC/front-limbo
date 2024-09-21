import { useState } from "react";
import styles from "./profile.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const { dataUser } = useContexts();
  const [name, setName] = useState(dataUser.name)
  const [email, setEmail] = useState(dataUser.email)
  const [nickname, setNickname] = useState(dataUser.nickname)
  
  const convertDate = (date) => {
    const parts = date.split('/');
    const [day, month, year] = parts;
    return `${year}-${month}-${day}`;
  }
  const [birthdate, setBirthdate] = useState(convertDate(dataUser.birthdate))

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    setIsEdit(isEdit);
  };

  return (
    <section className={styles.profile}>
      <PageTitle text={"Perfil"} />
      <form className={styles.boxMain}>
        <div className={`${styles.rowProfile} mb-5`}>
          <div className={`${styles.dataProfile}`}>
            <img
              src={dataUser.image_user}
              className={styles.imgProfile}
              alt="Imagem de perfil"
            />
            <div className={styles.userProfile}>
              <p>{dataUser.name}</p>
              <span>Pontos Totais: {dataUser.all_points} pontos</span>
              <span>Pontos Atuais: {dataUser.current_points} pontos</span>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div className={styles.boxProduct}>
        <h2 className={styles.title}>Produtos resgatados</h2>
        <ContainerProduct listItens={["teste"]} />
      </div>
    </section>
  );
}
