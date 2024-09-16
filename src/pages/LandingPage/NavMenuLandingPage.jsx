import { PropTypes } from "prop-types";
import { useState } from "react";

import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styles from "./NavMenuLandingPage.module.css";
import { BiSolidCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import formulaEImage from "/assets/logo-formulaE.png";
import { IoMenu } from "react-icons/io5";
import userProfilePic from "../../assets/user_profile.png";
import { IoIosLogOut } from "react-icons/io";
import { GiCarWheel } from "react-icons/gi";

import usaFlag from "/assets/usa-flag.png";

const ItemMenu = ({ children }) => {
  return (
    <li className="ps-menuitem-root css-1t8x7v1">
      <div
        className="ps-menu-button"
        data-testid="ps-menu-button-test-id"
        tabIndex="0"
      >
        <span className="ps-menu-label css-12w9als">{children}</span>
      </div>
    </li>
  );
};
ItemMenu.propTypes = {
  children: PropTypes.node,
};

const ItemSubMenu = ({ children }) => {
  return (
    <li className="ps-menuitem-root css-1t8x7v1 pt-sub">
      <div
        className="ps-menu-button"
        data-testid="ps-menu-button-test-id"
        tabIndex="0"
      >
        <span className="ps-menu-label css-12w9als">{children}</span>
      </div>
    </li>
  );
};
ItemSubMenu.propTypes = {
  children: PropTypes.node,
};

export default function NavMobile() {
  const [toggled, setToggled] = useState(false);
  const handleMenuItemClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Sidebar
        className="containerHeader"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
      >
        <Menu>
          <SubMenu
            defaultOpen={false}
            label={
              <div className={styles.userInfo}>
                <span className={styles.userName}>Sign In First</span>
              </div>
            }
            icon={
              <img
                className={styles.userImage}
                src={userProfilePic}
                alt="Imagem de usuário"
              />
            }
            className={styles.userProfile}
            onClick={handleMenuItemClick}
          >
            <ItemSubMenu>
              <a className={styles.linkItemProfile}>
                <img src={usaFlag} alt="EUA flag" className={styles.flagIcon} />
                <p>USA</p>
              </a>
            </ItemSubMenu>
            <ItemSubMenu>
              <a className={styles.linkItemProfile}>
                <IoIosLogOut />
                <p>Sign in</p>
              </a>
            </ItemSubMenu>
          </SubMenu>
          <div className="navegation">
            <ItemMenu>
              <a href="#section1" className={styles.itemMenu}>
                <GiCarWheel />
                <p>About Formula E</p>
              </a>
            </ItemMenu>
            <ItemMenu>
              <a to="/" className={styles.itemMenu}>
                <BiWorld />
                <p>Our Ecosystem</p>
              </a>
            </ItemMenu>
            <ItemMenu>
              <a to="/" className={styles.itemMenu}>
                <CgProfile />
                <p>Sign In</p>
              </a>
            </ItemMenu>
          </div>
        </Menu>
      </Sidebar>
      <nav className={styles.navMobile}>
        <img src={formulaEImage} alt="logo formula e" />
        <IoMenu
          className={styles.iconMenu}
          onClick={() => setToggled(!toggled)}
        />
      </nav>
    </>
  );
}
