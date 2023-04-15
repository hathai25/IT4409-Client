import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";

const Layout = ({children}) => {
  return(
    <div>
      <Navbar/>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout