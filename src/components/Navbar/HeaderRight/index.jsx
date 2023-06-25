import "./style.scss";
import {Avatar, Dropdown, notification, Space} from "antd";
import {useWindowSize} from "../../../hook/useWindowSize.js";
import {LG, MD} from "../../../constants.js";
import {DownOutlined, LoginOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import LogoutIcon from "../../../assets/icons/LogOutIcon.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {userLoginSuccess} from "../../../redux/actions/index.js";
import {getUserInfo} from "../../../redux/actions/user.action.js";
import axios from "axios";


const HeaderRight = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const windowSize = useWindowSize();
  const {avatar, username, productCart} = useSelector((state) => state.userInfo);
  const cart = useSelector((state) => state.userCart.cart);
  const navigate = useNavigate();

  const menu = [
    {
      key: '1',
      label: (
        <div
          className='menuUserItem'
          onClick={() => navigate('/my-account')}
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
          onClick={() => navigate('/orders')}
        >
          <ShoppingCartOutlined className='menuUserItem__icon' />
          <span>Order history</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className='menuUserItem' onClick={() => {
          dispatch(userLoginSuccess(null));
          localStorage.clear();
          window.location.href="/";
          notification.success({
            message: 'Success',
            description: 'Logout successfully!',
          });
        }}>
          <LogoutIcon className='menuUserItem__icon' />
          <span>Log out</span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (!token) {
      dispatch(getUserInfo({
        avatar_url: null,
        first_name: null,
        last_name: null,
        productCart: []
      }))
    }
  }, [dispatch, token])

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
                <Link onClick={(e) => e.preventDefault()} to={""}>
                  <Space>
                    <span>
                      {avatar ? (
                        <Avatar src={avatar} size={24} alt='avt' />
                      ) : (
                        <UserOutlined />
                      )}
                    </span>
                    {windowSize.width >= MD &&
                      `${username ?? ''}`}
                    <DownOutlined />
                  </Space>
                </Link>
              </Dropdown>
            ) : (
              <Link to={'/profile'}>
                <span>
                  {avatar ? (
                    <Avatar src={avatar} size={24} alt='avt' />
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
              <ShoppingCartOutlined />
              <div className='amount_product_cart'>
                <span>{cart ? cart?.length : productCart.length}</span>
              </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default HeaderRight;