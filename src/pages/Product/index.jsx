import styles from "./product.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import imgProdcut from "../../assets/airpods.svg";
import { FaHeart } from "react-icons/fa";

export default function Product() {
  const list = ["carro1", "carro2", "carro3", "carro1", "carro2", "carro3"];

  return (
    <section className={styles.product}>
      <div className={styles.boxProduct}>
        <div className={styles.boxImg}>
          <img src={imgProdcut} alt="Image product" />
        </div>
        <div className={styles.boxInfoProduct}>
          <div className={styles.titles}>
            <h1>Airpods pro</h1>
            <hr />
            <h2>Wireless Noise Cancelling Earphones</h2>
          </div>
          <p className={styles.description}> 
            Airpods Pro have been designed to deliver active noise cancellation
            for immersive sounds. Transparency mode so you can hear your
            surroundings.
          </p>
          <div className={styles.cardPrice}>
            <div className={styles.linePrince}>
              <p>150 pontos</p>
              <FaHeart />
            </div>
            <button>Resgatar produto</button>
          </div>
        </div>
      </div>
      <h3 className={styles.titleSection}>Mais produtos</h3>
      <ContainerProduct listItens={list} />
    </section>
  );
}
