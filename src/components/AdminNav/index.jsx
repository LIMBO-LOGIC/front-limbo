import { Menu, Sidebar } from "react-pro-sidebar";
import styles from "./adminNav.module.css";
import formulaEImage from "/assets/logo_formulaE_branca.png";
import { PropTypes } from "prop-types";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaFlagCheckered } from "react-icons/fa";
import { BsFillHouseFill } from "react-icons/bs";
import { RiDiceLine } from "react-icons/ri";

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
          onClick={() => navigate("/admin")}
          alt="logo formula e"
        />
      </div>
      <Menu className={styles.navRace}>
        <ItemMenu>
          <Link to="/admin/" className={styles.itemMenu}>
            <BsFillHouseFill />
            <p>Home</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/admin/raceList" className={styles.itemMenu}>
            <FaFlagCheckered />
            <p>Corridas</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/admin/productlist" className={styles.itemMenu}>
            <FiShoppingBag />
            <p>Produtos</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/admin/raceBet" className={styles.itemMenu}>
            <RiDiceLine  />
            <p>Chute da sorte</p>
          </Link>
        </ItemMenu>
      </Menu>
    </Sidebar>
  );
}
