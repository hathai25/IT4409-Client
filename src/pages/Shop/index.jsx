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
  const [category, setCategory] = useState();
  const [input, setInput] = useState("");

  //filter product with name
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(input.toLowerCase()) && product?.categories[0]?.name?.toLowerCase() === (category?.toLowerCase())
      )
    );
  }, [input,products])


  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product?.categories[0]?.name?.toLowerCase() === (category?.toLowerCase())
      )
    );
  }, [category ,products])

  console.log({filteredProducts})

  useEffect(() => {
    try {
      getAllProducts().then((res) => {
        setProducts(res?.data?.data?.items)
      })
    } catch (error) {
      console.log({error})
    }
  }, [category])

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
            <Filter input={input} setInput={setInput} category={category} setCategory={setCategory}/>
          </Row>
        )}
        <Row className="shop-products" gutter={windowSize.width >= SM ? [32, 32] : [16, 16]}>
          {filteredProducts.length === 0 ? currentProducts.map((product) => (
            <ProductCard product={product} key={product?.id}/>
          )) : filteredProducts.map((product) => (
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