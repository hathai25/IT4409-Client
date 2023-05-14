import {Col, Form, Modal, notification, Row, Steps} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import {
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
  WalletOutlined
} from "@ant-design/icons";
import {useRef, useState} from "react";
import {fakeCart} from "../../fakeData.js";
import AntButton from "../../components/common/Button/index.jsx";
import MyCart from "../../components/pages/Cart/MyCart/index.jsx";
import "./style.scss"
import ShippingInformation from "../../components/pages/Cart/ShippingInformation/index.jsx";
import PaymentMethod from "../../components/pages/Cart/PaymentMethod/index.jsx";
import Done from "../../components/pages/Cart/Done/index.jsx";
import Spinner from "../../components/common/Spinner/index.jsx";

const Cart = ({cart = fakeCart}) => {
  const [selectProduct, setSelectProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0);
  const shippingInfo = useRef();
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
        {step === 0 && <MyCart onSelectProduct={setSelectProduct} cart={fakeCart?.products}/>}
        {step === 1 && <ShippingInformation form={form} userInfo={JSON.parse(localStorage.getItem('userInfo'))}/>}
        {step === 2 && <PaymentMethod
          cart={selectProduct}
          shippingInfo={shippingInfo.current}
          form={formPayment}
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
                      shippingInfo: shippingInfo.current,
                      products: selectProduct,
                      paymentInfo: paymentInfo.current
                    }
                    console.log(sendData)
                    if (sendData) {
                      setLoading(true)
                      setTimeout(() => {
                        localStorage.removeItem('rowKey')
                        setLoading(false)
                        setStep(step + 1)
                        notification.success({
                          message: 'Success',
                          description: 'Order successfully!',
                        });
                      }, 5000)
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