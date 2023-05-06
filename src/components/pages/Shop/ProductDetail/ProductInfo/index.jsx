import {Form, Rate, Radio, InputNumber, Button, Row, Col} from "antd";

import "./style.scss"
import {formatCurrency} from "../../../../../utils/string.js";
import {useState} from "react";
import {MinusOutlined, PlusOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import AntButton from "../../../../common/Button/index.jsx";

const ProductInfo = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  return (
    <div className="product">
      <div className="product-detail">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <Rate value={product?.rating} disabled/>
        <h3>{formatCurrency(product?.price)}</h3>
      </div>
      <div className="product-action">
        <Form>
          <Form.Item
            name="size"
            label={<span style={{
              fontSize: "18px", height: "36px", lineHeight: "36px"
            }}>Size</span>}
            rules={[{required: true, message: 'Please pick a size!'}]}
            className="product-action-size"
          >
            <Radio.Group>
              {product?.size?.map((size) => (
                <Radio.Button
                  style={{fontSize: "18px", height: "36px", lineHeight: "36px", marginLeft: 16}}
                  value={size}
                  key={size}
                >
                  {size}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="color"
            label={<span style={{
              fontSize: "18px", height: "36px", lineHeight: "36px"
            }}>Color</span>}
            rules={[{required: true, message: 'Please pick a color!'}]}
            className="product-action-size"
          >
            <Radio.Group>
              {product?.color?.map((color) => (
                <Radio.Button style={{
                  fontSize: "18px",
                  height: "36px",
                  width: "36px",
                  backgroundColor: color,
                  lineHeight: "36px",
                  marginLeft: 16
                }} value={color} key={color}/>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="quantity"
            label={<span style={{
              fontSize: "18px", height: "36px", lineHeight: "36px"
            }}>Số lượng</span>}
            rules={[{required: true, message: 'Please select a quantity!'}]}
            className="product-action-size"
          >
            <Row>
              <div className="product-action-size-col">
                <Row>
                  <Button type={"link"} icon={<MinusOutlined style={{color: "#000000"}}/>} onClick={handleDecrement}/>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={setQuantity}
                    style={{borderTop: "none", borderBottom: "none"}}
                    controls={false}
                  />
                  <Button type={"link"} icon={<PlusOutlined style={{color: "#000000"}}/>} onClick={handleIncrement}/>
                </Row>
              </div>
            </Row>
          </Form.Item>
        </Form>
      </div>
      <Row gutter={32}>
        <Col xs={12}>
          <AntButton
            text={"Add to cart"}
            theme={"light"}
            icon={<ShoppingCartOutlined style={{fontSize: 16}}/>}
            style={{width: "80%"}}
          />
        </Col>
        <Col xs={12}>
          <AntButton
            text={"Buy now"}
            theme={"dark"}
            icon={<ShoppingCartOutlined style={{fontSize: 16}}/>}
            style={{width: "80%"}}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ProductInfo;