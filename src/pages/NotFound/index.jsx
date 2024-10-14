import { Link } from "react-router-dom";
import styles from "./notFound.module.css"; // Importando o CSS Module
import img_not_found from "./notFound.svg";
function NotFound({route}) {
  return (
    <section className={styles.container}>
      <img src={img_not_found} alt="" className={styles.image} />
      <h1 className={styles.title}>Oops! Página Não Encontrada</h1>
      <p className={styles.message}>
        Parece que a página que você está procurando não existe ou foi removida.
        Volte para a <Link to={route}>página inicial</Link>.
      </p>
    </section>
  );
}

export default NotFound;
