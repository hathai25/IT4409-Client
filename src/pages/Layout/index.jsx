import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import "./style.scss"

const Layout = ({children}) => {
  return(
    <div>
      <Navbar/>
      <div className="container">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout