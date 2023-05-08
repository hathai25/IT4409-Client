import "./style.scss";
import {useState} from "react";
import Logo from "./Logo/index.jsx";
import useScrollDirection from "../../hook/useScrollDirection.js";
import Links from "./Links/index.jsx";
import HeaderRight from "./HeaderRight/index.jsx";
const Navbar = () => {
  const [isMobileNav, setIsMobileNav] = useState(false);
  const scrollDirection = useScrollDirection();

  return(
    <div className={`fixed-header ${scrollDirection === 'down' ? 'hide' : 'show'}`}>
      <div className='nav-container'>
        <div className="header">
          <Logo setIsMobileNav={setIsMobileNav}/>
          <Links
            isMobileNav={isMobileNav}
            setIsMobileNav={setIsMobileNav}
          />
          <HeaderRight/>
        </div>
      </div>
    </div>
  )
}

export default Navbar