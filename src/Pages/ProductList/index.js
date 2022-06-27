import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

import { ProductCard, Layout, CustomModal } from "../../Components";
import { AddProduct } from "../../redux/action";

import styles from "./productStyles.module.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const productLists = useSelector(
    (state) => state.allReducers.productsListData
  );

  const [products, setProducts] = useState();
  const [searchText, setSearchText] = useState("");
  const [paginationArray, setPaginationArray] = useState([]);
  const [nameAsc, setNameAsc] = useState(true);
  const [priceAsc, setPriceAsc] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [extra, setExtra] = useState(0);

  const headers = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Price",
      key: "price",
    },
    {
      label: "Details",
      key: "des",
    },
  ];

  const sortProductsByPrice = (data) => {
    if (priceAsc) {
      setPriceAsc(false);
      return data.sort((x, y) => x.price - y.price);
    } else {
      setPriceAsc(true);
      return data.sort((x, y) => y.price - x.price);
    }
  };
  const sortProductsByName = (data) => {
    if (nameAsc) {
      setNameAsc(false);
      return data.sort((x, y) => x.name.localeCompare(y.name));
    } else {
      setNameAsc(true);
      return data.sort((x, y) => y.name.localeCompare(x.name));
    }
  };

  useEffect(() => {
    console.log("productLists", productLists);
    let pagination = Math.ceil(productLists.length / 10);
    setPaginationArray(pagination);
    setProducts(productLists);
  }, []);

  const sortingProduct = (type) => {
    if (type === "price") {
      setProducts(sortProductsByPrice(products));
      setExtra(extra + 1);
    } else {
      setProducts(sortProductsByName(products));
      setExtra(extra + 1);
    }
  };

  const AddNewProduct = (obj) => {
    products.push(obj);
    dispatch(AddProduct(products));
    setModalShow(false);
  };

  const onCLickDelete = async (i, k) => {
    let newArray = products.filter((item, index) => index !== k + pageCount);
    await dispatch(AddProduct(newArray));
    setProducts(newArray);
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

        {/* </Row> */}
        {searchText === "" && (
          <div className={styles.filterDiv}>
            <label>sort by:</label>
            <label
              className={styles.sortButton}
              onClick={() => sortingProduct("name")}
            >{`Name ${nameAsc ? "asc" : "desc"}`}</label>
            <label
              className={styles.sortButton}
              onClick={() => sortingProduct("price")}
            >{`Price ${priceAsc ? "asc" : "desc"}`}</label>
            {products && (
              <CSVLink
                filename={"product-list.csv"}
                className={styles.csvLink}
                data={products}
                headers={headers}
              >
                Download CSV
              </CSVLink>
            )}
          </div>
        )}
        {searchText === "" && (
          <label onClick={() => setModalShow(true)} className={styles.addNew}>
            Add New+
          </label>
        )}
        <Row>
          {products && searchText === ""
            ? products.slice(pageCount, pageCount + 10).map((item, index) => {
                return (
                  <Col xs={12} md={12} sm={12} lg={6}>
                    <ProductCard
                      key={index}
                      clickDelete={() => onCLickDelete(item, index)}
                      data={item}
                    />
                  </Col>
                );
              })
            : products &&
              products.map((item, index) => {
                if (
                  !item.name.toLowerCase().includes(searchText.toLowerCase())
                ) {
                  return null;
                }
                return (
                  <Col xs={12} md={12} sm={12} lg={6}>
                    <ProductCard
                      key={index}
                      data={item}
                      clickDelete={() => onCLickDelete(item, index)}
                    />
                  </Col>
                );
              })}
        </Row>
        <div className={styles.pagination}>
          {products &&
            searchText === "" &&
            [...Array(paginationArray)].map((i, k) => {
              return (
                <div
                  style={{
                    backgroundColor:
                      k === pageCount / 10
                        ? "rgba(7, 8, 58, 0.512)"
                        : "rgba(7, 8, 58, 1)",
                  }}
                  onClick={() => setPageCount(k * 10)}
                  className={styles.pageNumber}
                >
                  {k + 1}
                </div>
              );
            })}
        </div>
      </div>
      <CustomModal
        OnClose={() => setModalShow(false)}
        show={modalShow}
        OnAdd={(obj) => AddNewProduct(obj)}
      />
    </Layout>
  );
};
export default ProductList;
