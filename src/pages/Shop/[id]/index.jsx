import {Col, notification, Row} from "antd";
import {useParams} from "react-router-dom";

import ProductGallery from "../../../components/pages/Shop/ProductDetail/ProductGallery/index.jsx";
import ProductInfo from "../../../components/pages/Shop/ProductDetail/ProductInfo/index.jsx";

import './style.scss';
import {useEffect, useState} from "react";
import {getProductDetail} from "../../../services/shop.service.js";
import useCallApi from "../../../hook/useCallApi.js";
import Spinner from "../../../components/common/Spinner/index.jsx";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const {id} = useParams();

  const { send: fetchProductDetail, loading } = useCallApi({
    callApi: getProductDetail,
    success: (res) => {
      console.log(res)
      setProduct(res?.data)
    },
    error: (err) => {
      notification.error({
        message: "Error",
        description: "Something went wrong"
      })
    }
  })

  useEffect(() => {
    fetchProductDetail(id)
  }, [id])

  return (
    <div>
      {loading ? <div style={{height: 600}}><Spinner/></div> : (
        <Row>
          <Col xs={24} lg={12}>
            <ProductGallery images={product?.medias}/>
          </Col>
          <Col xs={24} lg={12}>
            <ProductInfo product={product}/>
          </Col>
        </Row>
      )}
    </div>
  )

}

export default ProductDetail;
