import ContainerProduct from "../../components/ContainerProduct";
import styles from "./marketplace.module.css";

export default function Marketplace() {
  const list = ["carro1", "carro2", "carro3", "carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3"];

  return (
    <section className={styles.marketplace}>
      <h1>Marketplace</h1>
      <div className={styles.boxMain}>
        <ContainerProduct listItens={list}/>
        
      </div>
    </section>
  );
}
