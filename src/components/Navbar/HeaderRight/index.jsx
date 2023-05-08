import "./style.scss";
import {Avatar, Dropdown, Space} from "antd";
import {useWindowSize} from "../../../hook/useWindowSize.js";
import {LG, MD} from "../../../constants.js";
import {DownOutlined, LoginOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogOutIcon.jsx";


const HeaderRight = () => {
  const token = localStorage.getItem('token');
  const windowSize = useWindowSize();
  let cart, avatar_url, first_name, last_name, productCart = []
  const navigate = useNavigate();

  const menu = [
    {
      key: '1',
      label: (
        <div
          className='menuUserItem'
          onClick={() => navigate('/profile')}
        >
          <UserOutlined className='menuUserItem__icon' />
          <span>My account</span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          className='menuUserItem'
          onClick={() => navigate('/order-history')}
        >
          <ShoppingCartOutlined className='menuUserItem__icon' />
          <span>Order history</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='menuUserItem' onClick={() => console.log("log out")}>
          <LogoutIcon className='menuUserItem__icon' />
          <span>Log out</span>
        </div>
      ),
    },
  ];

  return(
    <div className='header__right'>
      <ul className='right-option'>
        {token ? (
          <>
            {windowSize.width >= MD ? (
              <Dropdown
                menu={{ items: menu }}
                placement='bottomRight'
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span>
                      {avatar_url ? (
                        <Avatar src={avatar_url} size={24} alt='avt' />
                      ) : (
                        <UserOutlined />
                      )}
                    </span>
                    {windowSize.width >= MD &&
                      `${last_name ?? ''} ${first_name ?? ''}`}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <Link to={'/profile'}>
                <span>
                  {avatar_url ? (
                    <Avatar src={avatar_url} size={24} alt='avt' />
                  ) : (
                    <UserOutlined />
                  )}
                </span>
              </Link>
            )}
          </>
        ) : (
          <>
            <li className='right-item hide-mobile login-links'>
              <div
                className='login-links__item'
                style={{ border: 'none', cursor: 'pointer' }}
                onClick={() => navigate("/sign-in")}
              >
                <LoginOutlined />
                <span className='title'>Sign in</span>
              </div>
            </li>
            <li className='right-item hide-mobile login-links'>|</li>
            <li className='right-item hide-mobile register-links'>
              <div
                className='login-links__item'
                style={{ border: 'none', cursor: 'pointer' }}
                onClick={() => navigate("/sign-up")}
              >
                <UserAddOutlined />
                <span className='title'>Sign up</span>
              </div>
            </li>
          </>
        )}
        <li className='right-item eicon'>
          <Link to={"/cart"}>
            <a>
              <ShoppingCartOutlined />
              <div className='amount_product_cart'>
                <span>{cart ? cart?.length : productCart.length}</span>
              </div>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderRight;