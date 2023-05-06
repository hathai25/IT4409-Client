import {Button, Card, Col, Image, Row} from "antd";
import "./style.scss";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {formatCurrency} from "../../utils/string.js";
import {Link} from "react-router-dom";
import AntButton from "../common/Button/index.jsx";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return(
    <Col xs={12} md={8} xl={6}>
      <Link to={`/shop/product/${product?.id}`} className="card-link">
        <Card
          hoverable
          cover={
            <Image
              alt={product?.title}
              src={product?.thumbnail}
              width={"100%"}
              height={"320px"}
            />
          }
        >
          <Meta title={product?.title} description={<p className="card-desc">{product?.description}</p>}/>
          <Row style={{marginTop: 16}}>
            <Col span={12}>
              <p className="card-price">{formatCurrency(product?.price)}</p>
            </Col>
            <Col span={12}>
              <AntButton text={"Add to cart"} theme={"dark"} icon={<ShoppingCartOutlined style={{fontSize: 16}}/>}/>
            </Col>
          </Row>
        </Card>
      </Link>
    </Col>
  )
}

export default ProductCard;