import {Col, Row, Tabs} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";
import OrderTable from "../../components/pages/Order/OrderTable/index.jsx";

const Orders = () => {
  const items = [
    {
      key: '1',
      label: `Preparing`,
      children: <OrderTable order_status={"Prepared"}/>,
    },
    {
      key: '2',
      label: `Delivering`,
      children: <OrderTable order_status={"Delivering"}/>,
    },
    {
      key: '3',
      label: `Delivered`,
      children: <OrderTable order_status={"Delivered"}/>,
    },
    {
      key: '5',
      label: `Success`,
      children: <OrderTable order_status={"Received"}/>,
    },
    {
      key: '6',
      label: `Failed`,
      children: <OrderTable order_status={"Failure"}/>,
    }
  ];

  return (
    <Row>
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20}>
        <Tabs defaultActiveKey="1" items={items} />
      </Col>
    </Row>
  );
}

export default Orders