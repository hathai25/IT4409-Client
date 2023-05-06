import {Col, Row} from "antd";
import {fakeSingleProduct} from "../../../fakeData.js";

import ProductGallery from "../../../components/pages/Shop/ProductDetail/ProductGallery/index.jsx";
import ProductInfo from "../../../components/pages/Shop/ProductDetail/ProductInfo/index.jsx";

import './style.scss';

const ProductDetail = () => {

  return (
    <div>
      <Row>
        <Col xs={24} lg={12}>
          <ProductGallery images={fakeSingleProduct?.images}/>
        </Col>
        <Col xs={24} lg={12}>
          <ProductInfo product={fakeSingleProduct}/>
        </Col>
      </Row>
    </div>
  )

}

export default ProductDetail;
