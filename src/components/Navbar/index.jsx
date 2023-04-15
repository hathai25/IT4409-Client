import "./style.scss";
import {Menu} from "./menu.jsx";
import {Link} from "react-router-dom";
const Navbar = () => {
  return(
    <div className="nav-container">
      <div>
        <h2>Logo</h2>
      </div>
      <div className="menu">
        {Menu.map((item, index) =>
          <div className="menu-item" key={index}><Link to={item?.path}>{item?.name}</Link></div>
        )}
      </div>
      <div>
        <a href="/sign-in">Sign In</a>
      </div>
    </div>
  )
}

export default Navbar