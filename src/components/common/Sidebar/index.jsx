import {Col, Row} from "antd";
import {Link, useLocation} from "react-router-dom";
import './style.scss';
import {HomeOutlined, NotificationOutlined, ReadOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
const Sidebar = () => {
  const {pathname} = useLocation();

  return(
    <Row>
      <Col span={24}>
        <Link to={'/my-account'}>
          <p className={`side-link ${pathname === '/my-account' && `side-link-active`}`}>
            <UserOutlined/> My account
          </p>
        </Link>
      </Col>
      <Col span={24}>
        <Link to={'/address'}>
          <p className={`side-link ${pathname === '/address' && `side-link-active`}`}>
            <HomeOutlined /> Addresses
          </p>
        </Link>
      </Col>
      <Col span={24}>
        <Link to={'/cart'}>
          <p className={`side-link ${pathname === '/cart' && `side-link-active`}`}>
            <ShoppingCartOutlined /> Cart
          </p>
        </Link>
      </Col>
      <Col span={24}>
        <Link to={'/orders'}>
          <p className={`side-link ${pathname === '/orders' && `side-link-active`}`}>
            <ReadOutlined /> Orders
          </p>
        </Link>
      </Col>
    </Row>
  )
}

export default Sidebar