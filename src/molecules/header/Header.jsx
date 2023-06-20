import { FaCaretDown, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import logo from '@assets/images/logo.svg';
import '@molecules/header/Header.scss';

const Header = () => (
  <>
    <div className="header-nav-wrapper">
      <div className="header-navbar">
        <div className="header-image">
          <img src={logo} className="img-fluid" alt="logo" />
          <div className="app-name">SocialApp</div>
        </div>
        <div className="header-menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="header-nav">
          <li className="header-nav-item active-item">
            <span className="header-list-name">
              <FaRegBell className="header-list-icon" />
              <span className="bg-danger-dots dots"></span>
            </span>
            <ul className="dropdown-ul">
              <li className="dropdown-li"></li>
            </ul>
            &nbsp;
            {/* &nbsp es un entity para agregar espacio de separacion, en este caso con el elemento que va a estar al lado de el */}
          </li>
          <li className="header-nav-item active-item">
            <span className="header-list-name">
              <FaRegEnvelope className="header-list-icon" />
              <span className="bg-danger-dots dots"></span>
            </span>
            &nbsp;
          </li>
          <li className="header-nav-item">
            <span className="header-list-name profile-image">Avatar</span>
            <span className="header-list-name profile-name">
              Miguel
              <FaCaretDown className="header-list-icon caret" />
            </span>
            <ul className="dropdown-ul">
              <li className="dropdown-li"></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </>
);

export default Header;
