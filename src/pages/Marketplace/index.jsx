import { useEffect, useState } from "react"; // Importando hooks
import PageTitle from "../../components/PageTitle";
import axios from "axios"; // Importando axios
import styles from "./marketplace.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import useContexts from "../../hooks/useContext";
import { baseUrl } from "../../service/api";

export default function Marketplace() {
  const [productList, setProductList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { setIsLoading, dataUser } = useContexts();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/products`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(true);

    axios
      .get(`${baseUrl}/favoriteProduct/${dataUser.id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setFavorites(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setIsLoading, dataUser]);

  // const handleFavorite = async (product) => {
  //   const favoriteProduct = favorites.find((fav) => fav.product.id === product.id);
  //   console.log(favoriteProduct);
  //   if (favoriteProduct) {
  //     try {
  //       await axios.delete(
  //         `${baseUrl}/favoriteProduct/${favoriteProduct.id}`
  //       );
  //       setFavorites(favorites.filter((id) => id !== product.id));
  //     } catch (error) {
  //       console.log("Erro ao remover dos favoritos:", error);
  //     }
  //   } else {
  //     try {
  //       const response = await axios.post(`${baseUrl}/favoriteProduct`, {
  //         userId: dataUser.id,
  //         productId: product.id,
  //       });

  //       if (response.status === 200) {
  //         setFavorites([...favorites, response.data]);
  //       }
  //     } catch (error) {
  //       console.log("Erro ao adicionar aos favoritos:", error);
  //     }
  //   }
  // };

  return (
    <section className={styles.marketplace}>
      <PageTitle text={"Marketplace"} />
      <div className={styles.boxMain}>
        {productList.length > 0 && (
          <ContainerProduct
            listItens={productList.map((product) => ({
              ...product,
              isFavorited: favorites.find((fav) => fav.product.id === product.id),
            }))}
            setFavorites={setFavorites}
            favorites={favorites}
          />
        )}
      </div>
    </section>
  );
}
