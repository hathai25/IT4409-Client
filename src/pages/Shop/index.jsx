import {Pagination, Row} from "antd";
import ProductCard from "../../components/ProductCard/index.jsx";

import "./style.scss";
import {useEffect, useState} from "react";
import Filter from "../../components/pages/Shop/Filter/index.jsx";
import {getAllProducts} from "../../services/shop.service.js";
import {useWindowSize} from "../../hook/useWindowSize.js";
import {SM} from "../../constants.js";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const windowSize = useWindowSize();
  const productsPerPage = 16
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    try {
      getAllProducts().then((res) => {
        setProducts(res?.data?.products)
      })
    } catch (error) {
      console.log({error})
    }
  }, [])

  return(
    <div>
      {/*
        Need 3 main sections: filter, product view, pagination
        Filter: by category, by price, by , search
        Product view: grid view, list view
        Product card: image, name, price, rating, add to cart
        Pagination: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      */}
      <Row>
        {windowSize.width >= SM && (
          <Row style={{width: "100%"}}>
            <Filter/>
          </Row>
        )}
        <Row className="shop-products" gutter={windowSize.width >= SM ? [32, 32] : [16, 16]}>
          {currentProducts.map((product) => (
            <ProductCard product={product} key={product?.id}/>
          ))}
        </Row>
        <Row style={{margin: "0 auto"}}>
          <Pagination
            onChange={(page) => setCurrentPage(page)}
            pageSize={productsPerPage}
            total={products.length}
          />
        </Row>
      </Row>
    </div>
  )
}

export default Shop;