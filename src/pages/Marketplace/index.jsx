import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import styles from "./marketplace.module.css";

export default function Marketplace() {
  const list = ["carro1", "carro2", "carro3", "carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3","carro1", "carro2", "carro3"];

  return (
    <section className={styles.marketplace}>
      <PageTitle text={'Marketplace'}/>
      <div className={styles.boxMain}>
        <ContainerProduct listItens={list}/>
        
      </div>
    </section>
  );
}
