import "./style.scss"
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {FacebookFilled, PhoneFilled, TwitterCircleFilled} from "@ant-design/icons";

const Footer = () => {
  return(
    <footer className="footer">
      <Row gutter={16} style={{paddingBottom: "1rem", borderBottom: "1px solid #d9dce1"}}>
        <Col xs={24} md={6} className="footer__logo__col">
          <div className="footer__logo">
            <Link to="/">
              Fashionista
            </Link>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, adipisci, asperiores, atque autem
          </p>
        </Col>
        <Col xs={8} md={6}>
          <div className="footer__title">
            Shop
          </div>
          <ul>
            <li>
              <Link to="/">All Collections</Link>
            </li>
            <li>
              <Link to="/">Special Deals</Link>
            </li>
            <li>
              <Link to="/">Discounts</Link>
            </li>
          </ul>
        </Col>
        <Col xs={8} md={6}>
          <div className="footer__title">
            Company
          </div>
          <ul>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">Affiliates</Link>
            </li>
          </ul>
        </Col>
        <Col xs={8} md={6}>
          <div className="footer__title">
            Support
          </div>
          <ul>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">FAQS</Link>
            </li>
            <li>
              <Link to="/"><FacebookFilled /> <TwitterCircleFilled/> <PhoneFilled/></Link>
            </li>
          </ul>
        </Col>
      </Row>
      <div className="footer__copyright">
        Copyright @2023 Team36. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer