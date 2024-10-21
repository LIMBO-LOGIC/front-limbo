import CreateProductModule from "../../components/AdminCreateProductsModule";
import ProductListModule from "../../components/AdminListProductModule";
import UptadeProductModule from "../../components/AdminUptadeProductModule";

const AllProduct = () => {
  return (
    <>
      <CreateProductModule></CreateProductModule>
      <ProductListModule></ProductListModule>
      <UptadeProductModule></UptadeProductModule>
    </>
  );
};

export default AllProduct;
