import Homepage from "../../pages/Homepage/index.jsx";
import Shop from "../../pages/Shop/index.jsx";
import Contact from "../../pages/Contact/index.jsx";
import About from "../../pages/About/index.jsx";
import SignIn from "../../pages/SignIn/index.jsx";
import SignUp from "../../pages/SignUp/index.jsx";

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
  }
]