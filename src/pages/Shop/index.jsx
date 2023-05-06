import {Pagination, Row} from "antd";
import ProductCard from "../../components/ProductCard/index.jsx";
import {mockProducts} from "../../fakeData.js";

import "./style.scss";
import {useState} from "react";
import Filter from "../../components/pages/Shop/Filter/index.jsx";

const Shop = () => {
  const [products, setProducts] = useState(mockProducts?.products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return(
    <div>
      {/*
        Need 3 main sections: filter, product view, pagination
        Filter: by category, by price, by , search
        Product view: grid view, list view
        Product card: image, name, price, rating, add to cart
        Pagination: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      */}
      <h1>Shop</h1>
      <Row>
        <Row style={{width: "100%"}}>
          <Filter/>
        </Row>
        <Row className="shop-products" gutter={[32, 32]}>
          {currentProducts.map((product) => (
            <ProductCard product={product} key={product?.id}/>
          ))}
        </Row>
        <Row style={{margin: "0 auto"}}>
          <Pagination
            onChange={(page) => setCurrentPage(page)}
            pageSize={productsPerPage}
            total={mockProducts?.products.length}
          />
        </Row>
      </Row>
    </div>
  )
}

export default Shop;