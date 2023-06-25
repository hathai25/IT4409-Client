import Homepage from "../../pages/Homepage/index.jsx";
import Shop from "../../pages/Shop/index.jsx";
import Contact from "../../pages/Contact/index.jsx";
import About from "../../pages/About/index.jsx";
import SignIn from "../../pages/SignIn/index.jsx";
import SignUp from "../../pages/SignUp/index.jsx";
import ProductDetail from "../../pages/Shop/[id]/index.jsx";
import MyAccount from "../../pages/MyAccount/index.jsx";
import Notifications from "../../pages/Notifications/index.jsx";
import Orders from "../../pages/Orders/index.jsx";
import Cart from "../../pages/Cart/index.jsx";
import Address from "../../pages/Address/index.jsx";
import PaymentSuccess from "../../pages/PaymentSuccess/index.jsx";

export const MENU = [
  {
    name: 'Home',
    path: '/',
    element: <Homepage/>
  },
  {
    name: 'Shop',
    path: '/shop',
    element: <Shop/>
  },
  {
    path: '/shop/product/:id',
    element: <ProductDetail/>
  },
  {
    name: 'Contact',
    path: '/contact',
    element: <Contact/>
  },
  {
    name: 'About',
    path: '/about',
    element: <About/>
  },
  {
    name: '',
    path: '/sign-in',
    element: <SignIn/>
  },
  {
    name: '',
    path: '/sign-up',
    element: <SignUp/>
  },
  {
    name: '',
    path: '/my-account',
    element: <MyAccount/>
  },
  {
    name: '',
    path: '/address',
    element: <Address/>
  },
  {
    name: '',
    path: '/notifications',
    element: <Notifications/>
  },
  {
    name: '',
    path: '/cart',
    element: <Cart/>
  },
  {
    name: '',
    path: '/orders',
    element: <Orders/>
  },
  {
    name: '',
    path: '/cart/payment-success',
    element: <PaymentSuccess/>
  },
]