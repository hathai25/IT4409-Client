import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./style.scss"
import {Breadcrumb} from "antd";
import {useLocation} from "react-router-dom";

const Layout = ({children}) => {
  const {pathname} = useLocation();

  //map pathname to breadcrumb items
  const mapPathnameToBreadCrumbItems = [
    {href: "/my-account", title: "My Account"},
    {href: "/notifications", title: "Notifications"},
    {href: "/cart", title: "Cart"},
    {href: "/orders", title: "Orders"},
    {href: "/shop", title: "Shop"},
    {href: "/shop/:id", title: "Shop"},
    {href: "/contact", title: "Contact"},
    {href: "/about", title: "About"},
  ]

  const breadCrumbItems = [
    {title: "Home", href: "/"},
    ...mapPathnameToBreadCrumbItems.filter(item => item.href === pathname)
  ]

  console.log(breadCrumbItems)

  return(
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
