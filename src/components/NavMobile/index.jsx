import { PropTypes } from "prop-types";
import { useState } from "react";
import {
  FaFlagCheckered,
  FaGamepad,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import styles from "./navMobile.module.css";
import { LiaMedalSolid } from "react-icons/lia";
import { BiSolidCategory } from "react-icons/bi";
import  formulaEImage  from '/public/assets/logo-formulaE.png';
import { IoMenu } from "react-icons/io5";

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

  return (
    <>
      <Sidebar
        className="containerHeader"
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
      >
        <Menu>
          <ItemMenu></ItemMenu>
          <div className="navegation" onClick={() => setToggled(!toggled)}>
            <ItemMenu>
              <Link to="/" className={styles.itemMenu}>
                <BiSolidCategory />
                <p>Home</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link to="/" className={styles.itemMenu}>
                <FaUsers />
                <p>Equipes</p>
              </Link>
            </ItemMenu>
            <SubMenu
              defaultOpen
              label="Corridas"
              icon={<FaFlagCheckered />}
              className={styles.subMenu}
            >
              <ItemSubMenu>
                <Link className={styles.linkItem} to="/race">
                  <span>Corridas</span>
                </Link>
              </ItemSubMenu>
              <ItemSubMenu>
                <Link className={styles.linkItem}>
                  <span>Corrida ao vivo</span>
                </Link>
              </ItemSubMenu>
              <ItemSubMenu>
                <Link className={styles.linkItem}>
                  <span>Chute da sorte</span>
                </Link>
              </ItemSubMenu>
            </SubMenu>
            <ItemMenu>
              <Link to="/" className={styles.itemMenu}>
                <FaShoppingBag />
                <p>Marketplace</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link to="/" className={styles.itemMenu}>
                <FaGamepad />
                <p>Quiz</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link to="/" className={styles.itemMenu}>
                <LiaMedalSolid />
                <p>Ranking</p>
              </Link>
            </ItemMenu>
          </div>
        </Menu>
      </Sidebar>
      <nav className={styles.navMobile}>
        <img src={formulaEImage} alt="logo formula e" />
        <IoMenu />
      </nav>
    </>
  );
}
