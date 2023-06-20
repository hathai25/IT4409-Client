import {Form, Rate, Radio, InputNumber, Button, Row, Col, message, notification} from "antd";

import "./style.scss"
import {formatCurrency} from "../../../../../utils/string.js";
import {useState} from "react";
import {MinusOutlined, PlusOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import AntButton from "../../../../common/Button/index.jsx";
import {addToCart, getUserCart} from "../../../../../services/cart.service.js";
import {getUserCartSuccess} from "../../../../../redux/actions/cart.action.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const ProductInfo = ({product}) => {
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();
  const userId = JSON.parse(localStorage.getItem("userInfo"))?.userId;
  const dispatch = useDispatch();
  const [stock, setStock] = useState(product?.attributeDefaults?.reduce((acc, cur) => acc + cur?.inventoryNumber, 0));
  const navigate = useNavigate()
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const size = form.getFieldValue("size");
    const color = form.getFieldValue("color");
    const id = product?.attributeDefaults?.find((attribute) => attribute?.size === size && attribute?.color === color)?.id;
    try {
      addToCart(quantity, id).then((res) => {
        if (res?.status === 201) {
          message.success("Add to cart successfully");
          try {
            getUserCart(userId).then((res) => {
              dispatch(getUserCartSuccess(res?.data?.data?.items));
            });
          } catch (err) {
            console.log(err);
            notification.error({
              message: 'Error',
              description: "Can't get user cart!"
            });
          }
        } else {
          message.error("Add to cart failed");
        }
      })
    } catch (error) {
      console.log({error})
      message.error("Add to cart failed");
    }
  }

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const sizes = [...new Set(product?.attributeDefaults?.map((attribute) => attribute?.size))]
  const colors = [...new Set(product?.attributeDefaults?.map((attribute) => attribute?.color))]


  return (
    <div className="product">
      <div className="product-detail">
        <h1>{product?.productId?.name}</h1>
        <p>{product?.productId?.description}</p>
        <Rate value={product?.productId?.rate} disabled/>
        <h3>{formatCurrency(parseInt(product?.productId?.price))}</h3>
      </div>
      <div className="product-action">
        <Form
          form={form}
          onValuesChange={(changedValues, allValues) => {
            if (allValues?.size && allValues?.color) setStock(product?.attributeDefaults?.find((attribute) => attribute?.size === allValues?.size && attribute?.color === allValues?.color)?.inventoryNumber)
            else if (allValues?.size && !allValues?.color) {
              setStock(product?.attributeDefaults?.filter((attribute) => attribute?.size === allValues?.size).reduce((acc, cur) => acc + cur?.inventoryNumber, 0))
            } else if (!allValues?.size && allValues?.color) {
              setStock(product?.attributeDefaults?.filter((attribute) => attribute?.color === allValues?.color).reduce((acc, cur) => acc + cur?.inventoryNumber, 0))
            } else {
              setStock(product?.attributeDefaults?.reduce((acc, cur) => acc + cur?.inventoryNumber, 0))
            }
          }}
        >
          <Form.Item
            name="size"
            label={<span style={{
              fontSize: "18px", height: "36px", lineHeight: "36px"
            }}>Size</span>}
            rules={[{required: true, message: 'Please pick a size!'}]}
            className="product-action-size"
          >
            <Radio.Group>
              {sizes?.map((size) => (
                <Radio.Button
                  style={{fontSize: "18px", height: "36px", lineHeight: "36px", marginLeft: 16}}
                  value={size}
                  key={size}
                >
                  {size?.toUpperCase()}
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
              {colors.map((color) => {
                return (
                  <Radio.Button style={{
                    fontSize: "18px",
                    height: "36px",
                    width: "36px",
                    backgroundColor: color,
                    lineHeight: "36px",
                    marginLeft: 16
                  }} value={color} key={color}/>)
              })}
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
            <p>(Còn {stock ? stock : 0} trong kho)</p>
          </Form.Item>
        </Form>
      </div>
      {product?.attributeValues?.length > 0 && <div className="product-action">
        <h4>Other attributes:</h4>
        {product?.attributeValues?.map((attribute) => (
          <Row>
            <Col xs={12}>
              <h3>{attribute?.attributeId?.name}</h3>
            </Col>
            <Col xs={12}>
              <p>{attribute?.value}</p>
            </Col>
          </Row>))}
      </div>}
      <Row gutter={32}>
        <Col xs={12}>
          <AntButton
            text={"Add to cart"}
            theme={"light"}
            icon={<ShoppingCartOutlined style={{fontSize: 16}}/>}
            style={{width: "80%"}}
            onClick={() => {
              if (stock) {
                if (form.getFieldValue("size") && form.getFieldValue("color")) {
                  handleAddToCart()
                } else {
                  message.error("Please select size and color")
                }
              } else {
                message.error("Out of stock")
              }
            }}
          />
        </Col>
        <Col xs={12}>
          <AntButton
            text={"Buy now"}
            theme={"dark"}
            icon={<ShoppingCartOutlined style={{fontSize: 16}}/>}
            style={{width: "80%"}}
            onClick={() => {
              if (stock) {
                if (form.getFieldValue("size") && form.getFieldValue("color")) {
                  handleAddToCart()
                  navigate("/cart")
                } else {
                  message.error("Please select size and color")
                }
              } else {
                message.error("Out of stock")
              }
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default ProductInfo;