import {Col, Row} from "antd";
import {useParams} from "react-router-dom";

import ProductGallery from "../../../components/pages/Shop/ProductDetail/ProductGallery/index.jsx";
import ProductInfo from "../../../components/pages/Shop/ProductDetail/ProductInfo/index.jsx";

import './style.scss';
import {useEffect, useState} from "react";
import {getProductDetail} from "../../../services/shop.service.js";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const {id} = useParams();

  useEffect(() => {
    try {
      getProductDetail(id).then((res) => {
        setProduct({
          ...res?.data,
          size: ["S", "M", "L", "XL", "XXL"],
          color: ["red", "green", "blue", "yellow", "black", "white"],
        })
      })
    } catch (error) {
      console.log({error})
    }
  }, [id])

  return (
    <div>
      <Row>
        <Col xs={24} lg={12}>
          <ProductGallery images={product?.images}/>
        </Col>
        <Col xs={24} lg={12}>
          <ProductInfo product={product}/>
        </Col>
      </Row>
    </div>
  )

}

export default ProductDetail;
