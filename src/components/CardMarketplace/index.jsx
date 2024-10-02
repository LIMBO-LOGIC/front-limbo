// CardMarketplace.jsx
import { FaHeart } from "react-icons/fa";
import styles from "./cardMarketplace.module.css";
import { useNavigate } from "react-router-dom";

export default function CardMarketplace({ product }) {
  const navigate = useNavigate();

  if (!product) {
    return <div>Produto não disponível</div>;
  }

  return (
    <div className={styles.cardMarketplace}>
      <div
        className={styles.boxImg}
        onClick={() => navigate(`/race/product/${product.id}`)} // Pass the product ID
      >
        <img
          className={styles.imgProduct}
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className={styles.dataCard}>
        <div className={styles.boxTitle}>
          <div className={styles.titles}>
            <h2>{product.name}</h2>
            <h3>{product.description}</h3>
          </div>
          <FaHeart />
        </div>
        <p className={styles.description}>{product.details}</p>
        <div className={styles.points}>
          <p>{product.change_points} pontos</p>
          <span className={styles.btnRedeem}>Resgatar</span>
        </div>
      </div>
    </div>
  );
}
