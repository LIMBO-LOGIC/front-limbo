import PropTypes from "prop-types"; // Importando PropTypes
import CardMarketplace from "../CardMarketplace";
import styles from "./containerProduct.module.css";

ContainerProduct.propTypes = {
  listItens: PropTypes.array.isRequired,
  onFavorite: PropTypes.func.isRequired, // Adicionando PropTypes para onFavorite
};

export default function ContainerProduct({ listItens, onFavorite }) {
  return (
    <div className={styles.containerProduct}>
      {listItens.map((product) => (
        <CardMarketplace
          key={product.id}
          product={product}
          onFavorite={onFavorite} // Passando a função onFavorite
          isFavorited={product.isFavorited} // Passando o estado de favorito
        />
      ))}
    </div>
  );
}
