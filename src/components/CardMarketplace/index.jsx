import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importar também o ícone de coração vazio
import styles from "./cardMarketplace.module.css";
import { useNavigate } from "react-router-dom";

export default function CardMarketplace({ product, onFavorite, isFavorited }) {
  const navigate = useNavigate();

  if (!product) {
    return <div>Produto não disponível</div>;
  }

  return (
    <div className={styles.cardMarketplace}>
      <div
        className={styles.boxImg}
        onClick={() => navigate(`/race/product/${product.id}`)}
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
          {isFavorited ? (
            <FaHeart
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(product);
              }}
            />
          ) : (
            <FaRegHeart
              onClick={(e) => {
                e.stopPropagation();
                onFavorite(product);
              }}
            />
          )}
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
