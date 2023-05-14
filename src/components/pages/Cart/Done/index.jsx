import {CheckCircleOutlined} from "@ant-design/icons";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import AntImage from "../../../common/AntImage/index.jsx";

const Done = () => {
  return (
    <Row>
      <Col span={24}>
        <AntImage
          src={"https://media.istockphoto.com/id/1397892955/photo/thank-you-message-for-card-presentation-business-expressing-gratitude-acknowledgment-and.jpg?s=612x612&w=0&k=20&c=7Lyf2sRAJnX_uiDy3ZEytmirul8pyJWm4l2fxiUtdvk="}
          width={612}
          height={344}
        />
        <p style={{fontSize: 32}}>You can check your order status <Link to={"/orders"}>here!</Link></p>
      </Col>
    </Row>
  );
}

export default Done;