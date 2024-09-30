import { PropTypes } from "prop-types";
import { useState } from "react";

import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styles from "./navMenuLandingPage.module.css";
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
                <span className={styles.userName}>Faça o login</span>
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
              <a
                style={{ cursor: "pointer" }}
                className={styles.linkItemProfile}
              >
              </a>
            </ItemSubMenu>
            <ItemSubMenu>
              <Link
                to="/login"
                style={{ cursor: "pointer" }}
                className={styles.linkItemProfile}
              >
                <IoIosLogOut />
                <p>Entrar</p>
              </Link>
            </ItemSubMenu>
          </SubMenu>
          <div className="navegacao">
            <ItemMenu>
              <a href="#desafio" className={styles.itemMenu}>
                <GiCarWheel />
                <p>Nosso Desafio</p>
              </a>
            </ItemMenu>
            <ItemMenu>
              <a href="#solucao" className={styles.itemMenu}>
                <BiWorld />
                <p>Soluçao</p>
              </a>
            </ItemMenu>
            <ItemMenu>
              <Link to="/login" className={styles.itemMenu}>
                <CgProfile />
                <p>Entrar</p>
              </Link>
            </ItemMenu>
          </div>
        </Menu>
      </Sidebar>
      <nav className={styles.navMobile}>
        <img src={formulaEImage} alt="logo fórmula E" />
        <IoMenu
          className={styles.iconMenu}
          onClick={() => setToggled(!toggled)}
        />
      </nav>
    </>
  );
}
