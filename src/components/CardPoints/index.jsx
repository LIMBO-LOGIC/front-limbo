import styles from "./cardPoints.module.css";
import { LuStar } from "react-icons/lu";
import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom";
import useContexts from "../../hooks/useContext";

CardPoints.propTypes = {
    points: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
  };

export default function CardPoints({ points, price }) {
  const navigate = useNavigate()
  const {setOrderData} = useContexts()
  const dataJson = {
    type: 'points',
    points,
    price,
  }

  return (
    <div className={`${styles.containerCard}`}>
      <div className={`${styles.cardPoint}`} onClick={() => navigate('/race/buy-product')}>
        <span className={`${styles.boxStar}`}>
          <LuStar />
        </span>
        <span className={styles.points}>{points} pontos</span>
      </div>
      <p>R$ {price}</p>
      <button onClick={() =>{
        setOrderData(dataJson)
        localStorage.setItem('orderData', JSON.stringify(dataJson))
        navigate('/race/buy-product')
      }}>Comprar</button>
    </div>
  );
}
