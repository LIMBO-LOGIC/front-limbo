import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ContainerProduct from "../../components/ContainerProduct";
import PageTitle from "../../components/PageTitle";
import useContexts from "../../hooks/useContext";
import styles from "./product.module.css";

export default function Product() {
  const { id } = useParams();
  const { setIsLoading } = useContexts();
  const [product, setProduct] = useState(null);
  const [remainingProducts, setRemainingProducts] = useState([]); // State for all products

  useEffect(() => {
    setIsLoading(true);
    // Fetch the specific product
    axios
      .get(`https://back-limbo-production.up.railway.app/products/${id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });

    // Fetch all products
    axios
      .get("https://back-limbo-production.up.railway.app/products", {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setRemainingProducts(response.data.filter((p) => p.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <PageTitle text={"Produtos"} />
      <section className={styles.product}>
        {" "}
        <div className={styles.boxProduct}>
          <div className={styles.boxImg}>
            <img
              src={product != null ? product.image : ""}
              alt={product != null ? product.name : ""}
            />
          </div>
          <div className={styles.boxInfoProduct}>
            <div className={styles.titles}>
              <h1>{product != null ? product.name : "Carregando"}</h1>
              <hr />
              <h2>{product != null ? product.description : ""}</h2>
            </div>
            <p className={styles.description}>
              {product != null ? product.details : ""}
            </p>
            <div className={styles.cardPrice}>
              <div className={styles.linePrince}>
                <p>{product != null ? product.change_points : ""} pontos</p>
                <FaHeart />
              </div>
              <button>Resgatar produto</button>
            </div>
          </div>
        </div>
        <h3 className={styles.titleSection}>Mais produtos</h3>
        <ContainerProduct listItens={remainingProducts} />{" "}
        {/* Pass the remaining products */}
      </section>
    </>
  );
}
