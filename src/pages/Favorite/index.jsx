import axios from "axios"; // Importando axios
import { useEffect, useState } from "react"; // Importando hooks
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";
import { baseUrl } from "../../service/api";
import styles from "./Favorite.module.css";

export default function Favorite() {
  const [productList, setProductList] = useState([]); // Estado para armazenar os produtos
  const { setIsLoading, dataUser } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    // Chamada para o endpoint
    axios
      .get(`${baseUrl}/product-rescues/${dataUser.id}`, {
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, setProductList]);

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Favoritos"} />
      <div className={styles.boxMain}>
        {productList.length > 0 && ( // Verifica se há produtos para mostrar
          <ContainerProduct listItens={productList} type={"favorite"} />
        )}
      </div>
    </section>
  );
}
