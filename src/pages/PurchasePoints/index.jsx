import CardPoints from "../../components/CardPoints";
import PageTitle from "../../components/PageTitle";
import styles from "./purchasePoints.module.css";

export default function PurchasePoints() {
  return (
    <section className={`${styles.containerPoints}`}>
      <PageTitle text={"Compra de pontos"} />
      <div className={styles.boxMain}>
        <CardPoints points={40} price="1,99"/>
        <CardPoints points={100} price="4,90"/>
        <CardPoints points={520} price="27,90"/>
        <CardPoints points={1070} price="54,90"/>
        <CardPoints points={2200} price="109,90"/>
        <CardPoints points={5750} price="279,90"/>
        <CardPoints points={12000} price="549,90"/>
      </div>
    </section>
  );
}