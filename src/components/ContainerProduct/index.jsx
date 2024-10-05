import PropTypes from "prop-types"; // Importando PropTypes
import CardMarketplace from "../CardMarketplace";
import styles from "./containerProduct.module.css";

ContainerProduct.propTypes = {
  listItens: PropTypes.array.isRequired,
  setFavorites: PropTypes.func,
  favorites: PropTypes.array,
};

export default function ContainerProduct({ listItens, setFavorites, favorites }) {
  return (
    <div className={styles.containerProduct}>
      {listItens.map((product) => (
        <CardMarketplace
          key={product.id}
          product={product}
          isFavorited={product.isFavorited ? true : false} 
          setFavorites={setFavorites ? setFavorites : undefined}
          favorites={favorites ? favorites : undefined}
        />
      ))}
    </div>
  );
}
