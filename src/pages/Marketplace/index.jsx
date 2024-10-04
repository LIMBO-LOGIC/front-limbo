import { useEffect, useState } from "react"; // Importando hooks
import PageTitle from "../../components/PageTitle";
import axios from "axios"; // Importando axios
import styles from "./marketplace.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import useContexts from "../../hooks/useContext";
import { baseUrl } from "../../service/api";

export default function Marketplace() {
  const [productList, setProductList] = useState([]); // Estado para armazenar os produtos
  const [favorites, setFavorites] = useState([]); // Estado para armazenar favoritos
  const { setIsLoading, dataUser } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    // Chamada para o endpoint
    axios
      .get(`${baseUrl}/products`, {
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
  }, [setIsLoading]);

  const handleFavorite = async (product) => {
    if (favorites.includes(product.id)) {
      // Remover dos favoritos
      try {
        await axios.delete(
          `${baseUrl}/favoriteProduct/${dataUser.id}/${product.id}`
        );
        setFavorites(favorites.filter((id) => id !== product.id));
      } catch (error) {
        console.log("Erro ao remover dos favoritos:", error);
      }
    } else {
      try {
        // Tentar adicionar aos favoritos
        const response = await axios.post(`${baseUrl}/favoriteProduct`, {
          userId: dataUser.id,
          productId: product.id,
        });

        // Adicionar o produto aos favoritos apenas se a criação for bem-sucedida
        if (response.status === 200) {
          setFavorites([...favorites, product.id]);
        }
      } catch (error) {
        console.log("Erro ao adicionar aos favoritos:", error);
      }
    }
  };

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Marketplace"} />
      <div className={styles.boxMain}>
        {productList.length > 0 && (
          <ContainerProduct
            listItens={productList.map((product) => ({
              ...product,
              isFavorited: favorites.includes(product.id),
            }))}
            onFavorite={handleFavorite}
          />
        )}
      </div>
    </section>
  );
}
