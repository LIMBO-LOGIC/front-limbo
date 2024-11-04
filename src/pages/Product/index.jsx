import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";
import styles from "./product.module.css";
import { baseUrl } from "../../service/api";
import ModalRedeemProduct from "../../components/ModalRedeemProduct";

export default function Product() {
  const { id } = useParams();
  const { setIsLoading, dataUser, setOrderData } = useContexts();
  const [product, setProduct] = useState(null);
  const [remainingProducts, setRemainingProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const navigate = useNavigate()

  const capitalize = (text) => {
    return text
      ? text
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/products/${id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setProduct(response.data);

        axios
          .get(`${baseUrl}/favoriteProduct/${dataUser.id}`, {
            headers: {
              accept: "application/json",
            },
          })
          .then((res) => {
            setFavorites(res.data);

            const favoriteProd = res.data.find(
              (fav) => fav.product.id === response.data.id
            );
            if (favoriteProd != undefined) {
              setIsFavoriteProduct(true);
            } else {
              setIsFavoriteProduct(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axios
      .get(`${baseUrl}/products`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        const list = [];

        for (let index = 0; list.length < 6; index++) {
          const element = response.data[index];

          if (element.id !== id) {
            list.push(element);
          }
        }
        setRemainingProducts(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, setIsLoading, dataUser, setFavorites, setProduct]);

  const handleFavorite = async () => {
    const favoriteProduct = favorites.find(
      (fav) => fav.product.id === product.id
    );
    const favorited = isFavoriteProduct;

    setIsFavoriteProduct(!isFavoriteProduct);
    setIsLoading(true);

    if (favorited) {
      try {
        await axios.delete(`${baseUrl}/favoriteProduct/${favoriteProduct.id}`);

        setFavorites(favorites.filter((fav) => fav.product.id !== product.id));
      } catch (error) {
        console.log("Erro ao remover dos favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`${baseUrl}/favoriteProduct`, {
          userId: dataUser.id,
          productId: product.id,
        });

        if (response.status === 201) {
          setFavorites([...favorites, response.data]);
        }
      } catch (error) {
        console.log("Erro ao adicionar aos favoritos:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }

  return (
    <>
      <PageTitle text={"Produtos"} />
      <section className={styles.product}>
        <div className={styles.boxProduct}>
          <div className={styles.boxImg}>
            <img
              src={product != null ? product.image : ""}
              alt={product != null ? product.name : ""}
            />
          </div>
          <div className={styles.boxInfoProduct}>
            <div className={styles.titles}>
              <h1>
                {capitalize(product != null ? product.name : "Carregando")}
              </h1>
              <hr />
              <h2>{product != null ? product.description : ""}</h2>
            </div>
            <p className={styles.description}>
              {product != null ? product.details : ""}
            </p>
            <div className={styles.cardPrice}>
              <div className={styles.linePrince}>
                <p>{product != null ? formatNumber(product.change_points) : ""} pontos</p>
                {isFavoriteProduct ? (
                  <FaHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(product);
                    }}
                  />
                ) : (
                  <FaRegHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(product);
                    }}
                  />
                )}
              </div>
              <button onClick={() => {
                if (
                  Number(dataUser.current_points) >=
                  Number(product.change_points)
                ) {
                  let dataJson = {
                    ...product,
                    type: "product",
                  };
                  setOrderData(dataJson);
                  localStorage.setItem("orderData", JSON.stringify(dataJson));
                  navigate("/race/buy-product");
                } else {
                  setIsShowModal(true)
                }
              }} className={styles.resgatar}>Resgatar produto</button>
            </div>
          </div>
        </div>
        <h3 className={styles.titleSection}>Mais produtos</h3>
        <ContainerProduct
          listItens={remainingProducts.map((product) => ({
            ...product,
            isFavorited: favorites.find((fav) => fav.product.id === product.id),
          }))}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </section>
      <ModalRedeemProduct setIsShow={setIsShowModal} isShow={isShowModal} product={product != null && product}/>
    </>
  );
}
