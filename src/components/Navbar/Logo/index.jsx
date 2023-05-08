import "./style.scss"
import {Link} from "react-router-dom";
import {MenuOutlined} from "@ant-design/icons";
import BarIcon from "../../../assets/icons/BarIcon.jsx";

const Logo = ({setIsMobileNav}) => {
  return(
    <div className="header__logo">
      <div className="drop-menu" onClick={() => setIsMobileNav(true)}>
        <span
          className={'hamburger-btn'}
        >
          <BarIcon/>
        </span>
      </div>
      <Link to="/">
        <a className="header-image">
          {/*<AntImage src={Logo} alt="img" width='400px' height='151px'/>*/}
          Fashionista
        </a>
      </Link>
    </div>
  )
}

export default Logo