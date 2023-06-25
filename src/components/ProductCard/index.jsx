import {Card, Col, Row, Skeleton} from "antd";
import "./style.scss";
import {ArrowRightOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {formatCurrency} from "../../utils/string.js";
import {Link} from "react-router-dom";
import AntButton from "../common/Button/index.jsx";
import {useWindowSize} from "../../hook/useWindowSize.js";
import {SM} from "../../constants.js";
import AntImage from "../common/AntImage/index.jsx";
import {useEffect, useState} from "react";
import {addToCart} from "../../services/cart.service.js";
import {useSelector} from "react-redux";

const {Meta} = Card;

const ProductCard = ({product}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product) setLoading(false);
  }, [product]);
  const windowSize = useWindowSize();
  return (
    <Col xs={12} xl={6}>
      <Link to={`/shop/product/${product?.id}`} className="card-link">
        <Card
          className={""}
          hoverable
          cover={
            <AntImage
              preview={false}
              alt={product?.title}
              src={product?.thumbnail}
              width={"100%"}
              height={"100%"}
            />
          }
        >
          {loading ? <Skeleton/> : (
            <>
              <Meta title={product?.name} description={<p className="card-desc">{product?.description}</p>}/>
              <Row style={{marginTop: 16}}>
                <Col xs={24} sm={12}>
                  <p className="card-price">{formatCurrency(product?.price)}</p>
                </Col>
                <Col xs={24} sm={12}>
                  <AntButton
                    style={{width: "100%"}}
                    text={"View product"}
                    theme={"dark"}
                    icon={<ArrowRightOutlined/>}
                  />
                </Col>
              </Row>
            </>
          )}
        </Card>
      </Link>
    </Col>
  )
}

export default ProductCard;
