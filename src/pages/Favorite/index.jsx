import axios from "axios";
import { useEffect, useState } from "react";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";
import { baseUrl } from "../../service/api";
import NoneFavorite from "../NoneFavorite/index";
import styles from "./Favorite.module.css";

export default function Favorite() {
  const [productList, setProductList] = useState([]);
  const { setIsLoading, dataUser } = useContexts();

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/favoriteProduct/${dataUser.id}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        );
        console.log(response.data);

        const uniqueProducts = new Set();
        const filteredProducts = response.data.reduce((acc, item) => {
          const product = item.product;

          if (!uniqueProducts.has(product.id)) {
            uniqueProducts.add(product.id);
            acc.push({
              id: product.id,
              image: product.image,
              name: product.name,
              description: product.description,
              details: product.details,
              change_points: product.change_points,
            });
          }
          return acc;
        }, []);

        setProductList(filteredProducts);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [setIsLoading, dataUser.id]);

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Favoritos"} />
      <div className={styles.boxMain}>
        {productList.length > 0 ? (
          <ContainerProduct
            listItens={productList}
            onFavorite={() => {}} // Implementar função de favoritar se necessário
          />
        ) : (
          <NoneFavorite />
        )}
      </div>
    </section>
  );
}
