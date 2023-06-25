import {Col, Row, Steps} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import {ShoppingCartOutlined, SmileOutlined, SolutionOutlined, WalletOutlined} from "@ant-design/icons";
import Done from "../../components/pages/Cart/Done/index.jsx";
import {useParams} from "react-router-dom";

const PaymentSuccess = () => {
  const params = useParams()

  const step = 3
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

  return(
    <Row>
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20}>
        <Steps
          current={step}
          items={stepItems}
          style={{marginBottom: '2rem'}}
        />
          {step === 3 && <Done/>}
          </Col>
    </Row>
  )
}

export default PaymentSuccess