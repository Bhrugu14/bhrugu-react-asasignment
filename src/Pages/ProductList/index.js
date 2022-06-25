import { useEffect, useState } from "react";

import { ProductCard, Layout } from "../../Components";
import { productsData } from "../../Data";

import styles from "./productStyles.module.css";

const ProductList = () => {
  const [products, setProducts] = useState();
  const [searchText, setSearchText] = useState("");
  const [extra, setExtra] = useState(0);

  const sortProducts = (data) => {
    return data.sort((x, y) => y.liked - x.liked);
  };

  useEffect(() => {
    setProducts(sortProducts(productsData));
  }, []);

  const ClickLike = (item, index) => {
    products[index].liked = !item.liked;
    setProducts(sortProducts(products));
    setExtra(extra + 1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <input
          placeholder="Search products"
          type="text"
          className={styles.searchInput}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {products &&
          products.map((item, index) => {
            if (!item.name.toLowerCase().includes(searchText.toLowerCase())) {
              return null;
            }
            return (
              <ProductCard
                key={index}
                clickLike={() => ClickLike(item, index)}
                data={item}
              />
            );
          })}
      </div>
    </Layout>
  );
};
export default ProductList;
