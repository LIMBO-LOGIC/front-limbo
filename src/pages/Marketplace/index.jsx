import { useEffect, useState } from "react"; // Importando hooks
import PageTitle from "../../components/PageTitle";
import axios from "axios"; // Importando axios
import styles from "./marketplace.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import useContexts from "../../hooks/useContext";

export default function Marketplace() {
  const [productList, setProductList] = useState([]); // Estado para armazenar os produtos
  const { setIsLoading } = useContexts();

  useEffect(() => {
    setIsLoading(true)
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
      }).finally(() => {
        setIsLoading(false);
      })
  }, [setIsLoading, setProductList]);

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Marketplace"} />
      <div className={styles.boxMain}>
        {productList.length > 0 && ( // Verifica se há produtos para mostrar
          <ContainerProduct listItens={productList}/>
        )}
      </div>
    </section>
  );
}
