import { Link } from "react-router-dom";
import styles from "./NoneFavorite.module.css"; // Importando o CSS Module
import img_none_favorite from "./noneFavorite.svg";
function NoneFavorite() {
  return (
    <section className={styles.container}>
      <img src={img_none_favorite} alt="" className={styles.image} />
      <h5 className={styles.title}>
        Oops! Parece que você não tem nenhum produto favorito ainda
      </h5>
      <p className={styles.message}>
        Acesse o nosso martketplace para poder favoritar produtos{" "}
        <Link to={"/race/marketplace"}>Martekplace</Link>.
      </p>
    </section>
  );
}

export default NoneFavorite;
