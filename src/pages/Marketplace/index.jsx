import { useEffect, useState } from "react"; // Importando hooks
import PageTitle from "../../components/PageTitle";
import CardMarketplace from "../../components/CardMarketplace"; // Importando o componente CardMarketplace
import axios from "axios"; // Importando axios
import styles from "./marketplace.module.css";

export default function Marketplace() {
  const [productList, setProductList] = useState([]); // Estado para armazenar os produtos

  useEffect(() => {
    // Chamada para o endpoint
    axios
      .get("https://back-limbo-production.up.railway.app/products", {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setProductList(response.data); // Atualizando o estado com os dados recebidos
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Marketplace"} />
      <div className={styles.boxMain}>
        {productList.length > 0 ? ( // Verifica se há produtos para mostrar
          <div className={styles.cardContainer}>
            {" "}
            {/* Novo contêiner para os cartões */}
            {productList.map((product) => (
              <CardMarketplace key={product.id} product={product} /> // Renderiza cada CardMarketplace
            ))}
          </div>
        ) : (
          <div>Carregando produtos...</div>
        )}
      </div>
    </section>
  );
}
