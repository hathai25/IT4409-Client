import {Button, Col, Input, Row} from "antd";
import {Link} from "react-router-dom";
import {MailOutlined} from "@ant-design/icons";

const Subscribe = () => {
  return(
    <div>
      <Row justify={"center"} style={{marginBottom: 48}}>
        <Col sx={24} lg={12}>
          <h2 style={{marginTop: 48}}>Subcribe to our newsletter to get updates to our latest collections</h2>
          <p>Get 20% off on your first order just by subscribing to our newsletter</p>
          <Col span={20} style={{display: "flex", margin: "auto"}}>
            <Input style={{marginRight: 24}} placeholder={"Enter your email..."} prefix={<MailOutlined />}/>
            <Button style={{background: "#000000", color: "#ffffff", width: 150, height: 50}}>Subscribe</Button>
          </Col>
          <p>You will be able to unsubscribe at any time.</p>
          <p>Read our Privacy Policy <Link to={"/"}>here</Link>.</p>
        </Col>
      </Row>
    </div>
  )
}

export default Subscribe