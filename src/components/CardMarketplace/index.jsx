import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importar também o ícone de coração vazio
import styles from "./cardMarketplace.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../service/api";
import useContexts from "../../hooks/useContext";
import ModalRedeemProduct from "../ModalRedeemProduct";

CardMarketplace.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    details: PropTypes.string,
    image: PropTypes.string.isRequired,
    change_points: PropTypes.string.isRequired,
    id_favorite_product: PropTypes.number,
  }).isRequired,
  setFavorites: PropTypes.func,
  isFavorited: PropTypes.bool,
  favorites: PropTypes.array,
};

export default function CardMarketplace({
  product,
  isFavorited,
  setFavorites,
  favorites,
}) {
  const navigate = useNavigate();
  const path = useLocation();
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(null);
  const { dataUser, setIsLoading } = useContexts();
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    setIsFavoriteProduct(isFavorited);
  }, [setIsFavoriteProduct, isFavorited]);

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

  if (!product) {
    return <div>Produto não disponível</div>;
  }


  return (
    <>
      <div className={styles.cardMarketplace}>
        <div
          className={styles.boxImg}
          onClick={() => navigate(`/race/product/${product.id}`)}
        >
          <img
            className={styles.imgProduct}
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className={styles.dataCard}>
          <div className={styles.boxTitle}>
            <div className={styles.titles}>
              <h2>{product.name}</h2>
              <h3>{product.description}</h3>
            </div>
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
          <p className={styles.description}>{product.details}</p>
          <div className={styles.points}>
            <p>{product.change_points} pontos</p>
            {path.pathname != "/race/profile" && (
              <span onClick={() => setIsShowModal(true)} className={styles.btnRedeem}>
                Resgatar
              </span>
            )}
          </div>
        </div>
      </div>
      <ModalRedeemProduct setIsShow={setIsShowModal} isShow={isShowModal}/>
    </>
  );
}
