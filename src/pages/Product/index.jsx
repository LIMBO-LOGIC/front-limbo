import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import ContainerProduct from "../../components/ContainerProduct";
import axios from "axios";
import { FaHeart } from "react-icons/fa";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]); // State for all products

  useEffect(() => {
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
      });

    // Fetch all products
    axios
      .get("https://back-limbo-production.up.railway.app/products", {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!product) {
    return <div>Carregando produto...</div>;
  }

  // Filter out the current product from the list of all products
  const remainingProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <section className={styles.product}>
      <div className={styles.boxProduct}>
        <div className={styles.boxImg}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.boxInfoProduct}>
          <div className={styles.titles}>
            <h1>{product.name}</h1>
            <hr />
            <h2>{product.description}</h2>
          </div>
          <p className={styles.description}>{product.details}</p>
          <div className={styles.cardPrice}>
            <div className={styles.linePrince}>
              <p>{product.change_points} pontos</p>
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
  );
}
