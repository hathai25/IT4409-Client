import "./style.scss"
import {MENU} from "../menu.jsx";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useRef} from "react";
import CloseMenuIcon from "../../../assets/icons/index.jsx";

const Links = ({ isMobileNav, setIsMobileNav }) => {
  //get path from url with react router dom
  const {pathname} = useLocation()
  const path = pathname.split('/');
  const navRef = useRef(null);
  function TouchOutsideAlert(ref) {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsMobileNav(false);
      }
    }
    useEffect(() => {
      document.addEventListener('touchend', handleClickOutside);
      return () => {
        document.removeEventListener('touchend', handleClickOutside);
      };
    }, [ref]);
  }

  TouchOutsideAlert(navRef);
  return (
    <div ref={navRef} className='header__menu'>
      <ul className={isMobileNav ? 'list-menu mobile-nav' : 'list-menu'}>
        <hr/>
        {MENU.filter(e => e.name).map((item, index) => (
          <li
            key={index}
            onClick={() => setIsMobileNav(false)}
            className={
              `/${path[1]}` === item.path ? 'box-item active' : 'box-item'
            }
          >
            <Link to={item?.path}>
              <a className='list-item'>
                {item?.name}
              </a>
            </Link>
          </li>
        ))}
        {isMobileNav && (
          <CloseMenuIcon
            className='close-nav'
            onClick={() => setIsMobileNav(false)}
          />
        )}
      </ul>
    </div>
  )
}

export default Links