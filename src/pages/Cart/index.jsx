import {Col, Form, Modal, notification, Row, Steps} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
  WalletOutlined
} from "@ant-design/icons";
import {useRef, useState} from "react";
import AntButton from "../../components/common/Button/index.jsx";
import MyCart from "../../components/pages/Cart/MyCart/index.jsx";
import "./style.scss"
import ShippingInformation from "../../components/pages/Cart/ShippingInformation/index.jsx";
import PaymentMethod from "../../components/pages/Cart/PaymentMethod/index.jsx";
import Done from "../../components/pages/Cart/Done/index.jsx";
import Spinner from "../../components/common/Spinner/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../services/order.service.js";
import {getUserCartSuccess} from "../../redux/actions/cart.action.js";

const Cart = () => {
  const cart = useSelector(state => state.userCart.cart)
  const [selectProduct, setSelectProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0);
  const shippingInfo = useRef();
  const shippingId = useRef();
  const dispatch = useDispatch();
  const totalPrice = useRef();
  const paymentInfo = useRef();
  const [form] = Form.useForm();
  const [formPayment] = Form.useForm();
  const stepItems = [
    {
      title: 'Cart',
      icon: <ShoppingCartOutlined/>,
    },
    {
      title: 'Shipping Address',
      icon: <SolutionOutlined/>,
    },
    {
      title: 'Payment Method',
      icon: <WalletOutlined/>,
    },
    {
      title: 'Done',
      icon: <SmileOutlined/>,
    },
  ]

  console.log({selectProduct})

  return (
    <Row>
      {
        step === 2 && loading && (
          <Spinner/>
        )
      }
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20} style={{padding: '2rem'}}>
        <Steps
          current={step}
          items={stepItems}
          style={{marginBottom: '2rem'}}
        />
        {step === 0 && <MyCart onSelectProduct={setSelectProduct} cart={cart}/>}
        {step === 1 && <ShippingInformation shippingId={shippingId} form={form} userInfo={JSON.parse(localStorage.getItem('userInfo'))}/>}
        {step === 2 && <PaymentMethod
          cart={selectProduct}
          shippingInfo={shippingInfo.current}
          form={formPayment}
          totalPrice={totalPrice}
        />}
        {step === 3 && <Done/>}
        {step < 3 && (
          <div className="cart-action">
            <AntButton
              theme={"secondary"}
              text={"Back"}
              style={{marginRight: "1rem"}}
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
            />
            <AntButton
              text={step === 2 ? "Finish" : "Next"}
              onClick={() => {
                if (step === 0) {
                  if (selectProduct.length === 0) {
                    notification.warning({
                      message: 'Hey there!',
                      description: "Please select at least one product"
                    })
                    return
                  }
                  setStep(step + 1)
                } else if (step === 1) {
                  form.validateFields().then(() => {
                      setStep(step + 1)
                      shippingInfo.current = form.getFieldsValue()
                    }
                  ).catch(() => {
                  })
                } else if (step === 2) {
                  formPayment.validateFields().then(() => {
                    paymentInfo.current = formPayment.getFieldsValue()
                    const sendData = {
                      orderItems: [
                        ...selectProduct.map(item => {
                          return {
                            productAttributeDefault: item?.id,
                            number: item?.number
                          }
                        })
                      ],
                      paymentType: paymentInfo.current?.paymentMethod,
                      address: shippingId.current,
                      totalMoney: totalPrice.current + 20000,
                    }
                    console.log(sendData)
                    if (sendData) {
                      setLoading(true)
                      try {
                        createOrder(sendData).then(res => {
                          if (res.status === 201) {
                            localStorage.removeItem('rowKey')
                            setLoading(false)
                            setStep(step + 1)
                            dispatch(getUserCartSuccess([]))
                            notification.success({
                              message: 'Success',
                              description: 'Order successfully!',
                            });
                          } else {
                            notification.error({
                              message: 'Error',
                              description: 'Order failed!',
                            });
                          }
                        })
                      } catch (e) {
                        console.log(e)
                      }
                    }
                  }).catch(() => {})
                }
              }}
            >
              Next
            </AntButton>
          </div>)
        }
      </Col>
    </Row>
  );
}

export default Cart