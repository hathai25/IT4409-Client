import Homepage from "../../pages/Homepage/index.jsx";
import Shop from "../../pages/Shop/index.jsx";
import Contact from "../../pages/Contact/index.jsx";
import About from "../../pages/About/index.jsx";

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
]