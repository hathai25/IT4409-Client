import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./style.scss"
import {Breadcrumb, notification} from "antd";
import {useLocation} from "react-router-dom";
import {MAP_PATHNAME_TO_BREADCRUMB} from "../../constants.js";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../redux/actions/user.action.js";

import {getMe} from "../../services/user.service.js";
import {getUserCart} from "../../services/cart.service.js";
import {getUserCartSuccess} from "../../redux/actions/cart.action.js";

const Layout = ({children}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginUser.token);
  const {pathname} = useLocation();

  const breadCrumbItems = [
    {title: "Home", href: "/"},
    ...MAP_PATHNAME_TO_BREADCRUMB.filter(item => item.href === pathname)
  ]

  useEffect(() => {
    if (token) {
      try {
        getMe().then((res) => {
          dispatch(getUserInfo({
            ...res?.data?.data,
            productCart: []
          }));
          let userId = res?.data?.data?.userId;
          localStorage.setItem('userInfo', JSON.stringify(res?.data?.data));
          try {
            getUserCart(userId).then((res) => {
              dispatch(getUserCartSuccess(res?.data?.carts[0]?.products));
            });
          } catch (err) {
            console.log(err);
            notification.error({
              message: 'Error',
              description: "Can't get user cart!"
            });
          }
        });
      } catch (err) {
        console.log(err);
        notification.error({
          message: 'Error',
          description: "Can't get user information"
        });
      }
    }
  }, [dispatch, token])

  return (
    <div>
      <Navbar/>
      <div className="container">
        {pathname !== "/" && (
          <Breadcrumb
            separator={">"}
            items={breadCrumbItems}
            style={{marginBottom: 16, fontSize: 16}}
          />
        )}
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
