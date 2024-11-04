/* eslint-disable react/prop-types */
import { LuStar } from "react-icons/lu";
import styles from "./cardProductPoint.module.css";

export default function CardProductPoint({ type, product }) {
  return (
    <div className={`${styles.cardProduct}`}>
      {type == "product" ? (
        <div className={`${styles.boxImg}`}>
          <img src="" alt="   " />
        </div>
      ) : (
        <div className={`${styles.boxStart}`}>
          <span className={`${styles.circle}`}>
            <LuStar />
          </span>
        </div>
      )}
      <div className={`${styles.productDescription}`}>
        <p>{product?.points} pontos</p>
        <span>R$ {product?.price}</span>
      </div>
    </div>
  );
}
