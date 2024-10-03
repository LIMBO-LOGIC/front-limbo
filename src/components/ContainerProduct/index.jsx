import PropTypes from "prop-types"; // Importing PropTypes without destructuring
import CardMarketplace from "../CardMarketplace";
import styles from "./containerProduct.module.css";

ContainerProduct.propTypes = {
  listItens: PropTypes.array.isRequired, // Ensure the array is required
};

export default function ContainerProduct({ listItens, type }) {
  return (
    <div className={styles.containerProduct}>
      {listItens.map(
        (
          product // Change `item` to `product`
        ) => (
          <CardMarketplace
            key={product.id}
            product={type == "favorite" ? product.product : product}
          /> // Use `product` here
        )
      )}
    </div>
  );
}
