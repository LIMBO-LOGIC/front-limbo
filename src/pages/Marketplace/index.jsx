import CardMarketplace from "../../components/CardMarketplace";
import styles from "./marketplace.module.css";

export default function Marketplace() {
  return (
    <section className={styles.marketplace}>
      <h1>Marketplace</h1>
      <div className={styles.boxMain}>
        <CardMarketplace />
        
      </div>
    </section>
  );
}
