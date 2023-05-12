import {Col, Row} from "antd";
import Sidebar from "../../components/common/Sidebar/index.jsx";

const Cart = () => {
  return (
    <Row>
      <Col xs={0} md={4}>
        <Sidebar/>
      </Col>
      <Col xs={24} md={20}>
      </Col>
    </Row>
  );
}

export default Cart