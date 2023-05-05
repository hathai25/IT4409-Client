import {Avatar, Card, Col, Row} from "antd";
import {SERVICES} from "./services.js";
import "./style.scss"
const { Meta } = Card;

const Services = () => {
  return(
    <div style={{textAlign: "left", marginBottom: 48}}>
      <Row style={{margin: "32px 0"}}>
        <Col style={{borderRight: "1px solid black", paddingLeft: 16}} span={12}>
          <h2 className="title">We provide best customer experiences</h2>
        </Col>
        <Col style={{paddingLeft: 16}} span={12}>
          <h2 className="title">We ensure our customer have the best shopping experiences</h2>
        </Col>
      </Row>
      <Row gutter={32}>
        {SERVICES.map((item, index) => (
          <Col style={{margin: "16px 0"}} xs={24} md={12} lg={6} key={index}>
            <Card
              className="card"
            >
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              />
              <h4>{item?.heading}</h4>
              <p>{item?.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Services