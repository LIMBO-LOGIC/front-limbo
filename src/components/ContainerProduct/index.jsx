import { PropTypes } from "prop-types";
import CardMarketplace from "../CardMarketplace";
import styles from './containerProduct.module.css'

ContainerProduct.propTypes = {
  listItens: PropTypes.array,
};

export default function ContainerProduct({ listItens }) {
  return (
    <div className={styles.containerProduct}>
      {listItens.map((item, index) => {
        return <CardMarketplace key={index} item={item} />;
      })}
    </div>
  );
}
