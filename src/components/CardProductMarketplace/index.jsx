/* eslint-disable react/prop-types */
import styles from "./cardProductMarketplace.module.css";

export default function CardProductMarketplace({ product }) {
  function formatToPrice(value) {
    const formattedValue = (value - 0.1).toFixed(2);
    return formattedValue.replace(".", ",");
  }

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }

  return (
    <div className={`${styles.cardProduct}`}>
      <div className={`${styles.boxImg}`}>
        <img src={product?.image} alt={product.name} />
      </div>
      <section className={`${styles.productDescription} notContainer`}>
        <div className={`${styles.boxText}`}>
          <p>{product?.name}</p>
          <span>{product?.description}</span>
        </div>
        <span>
          {formatNumber(product?.change_points)} pontos
          {product?.price != 0 && ` + R$ ${formatToPrice(product?.price)}`}
        </span>
      </section>
    </div>
  );
}
