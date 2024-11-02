import styles from "./cardPoints.module.css";
import { LuStar } from "react-icons/lu";
import PropTypes from "prop-types"; 

CardPoints.propTypes = {
    points: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  };

export default function CardPoints({ points, price }) {
  return (
    <div className={`${styles.containerCard}`}>
      <div className={`${styles.cardPoint}`}>
        <span className={`${styles.boxStar}`}>
          <LuStar />
        </span>
        <span className={styles.points}>{points} pontos</span>
      </div>
      <p>R$ {price}</p>
      <button>Comprar</button>
    </div>
  );
}
