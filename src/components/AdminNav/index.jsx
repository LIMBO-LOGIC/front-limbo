import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import styles from "./adminNav.module.css";
import formulaEImage from "/assets/logo_formulaE_branca.png";
import { BiSolidCategory } from "react-icons/bi";
import { PropTypes } from "prop-types";
import {
  FaFlagCheckered,
  FaGamepad,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LiaMedalSolid } from "react-icons/lia";

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

export default function AdminNav() {
  const navigate = useNavigate();

  return (
    <Sidebar className={styles.sidebar}>
      <div className={styles.boxImg}>
        <img
          src={formulaEImage}
          onClick={() => navigate("/race")}
          alt="logo formula e"
        />
      </div>
      <Menu className={styles.navRace}>
        <ItemMenu>
          <Link to="/race" className={styles.itemMenu}>
            <BiSolidCategory />
            <p>Corridas</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/race/teams" className={styles.itemMenu}>
            <FaUsers />
            <p>Produtos</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/race/marketplace" className={styles.itemMenu}>
            <FaShoppingBag />
            <p>Usuarios</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/race/quiz" className={styles.itemMenu}>
            <FaGamepad />
            <p>Quiz</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/race/ranking" className={styles.itemMenu}>
            <LiaMedalSolid />
            <p>Ranking</p>
          </Link>
        </ItemMenu>
        {/* <ItemMenu>
          <Link to="/" className={styles.itemMenu}>
            <FaShoppingBag />
            <p>Fórum</p>
          </Link>
        </ItemMenu> */}
      </Menu>
    </Sidebar>
  );
}
