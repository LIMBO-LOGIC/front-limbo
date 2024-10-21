import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import styles from "./adminNav.module.css";
import formulaEImage from "/assets/logo_formulaE_branca.png";
import { PropTypes } from "prop-types";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";

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
        <SubMenu
          defaultOpen={false}
          label="Corrida"
          icon={<FiShoppingBag />}
          className={styles.subMenu}
        >
          <ItemSubMenu>
            <Link className={styles.linkItem} to="/admin/allCreateRace">
              <span>Geral Corrida</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/admin/createRace"} className={styles.linkItem}>
              <span>Criar Corridas</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/admin/raceList"} className={styles.linkItem}>
              <span>Lista Corridas</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/admin/uptadeRace"} className={styles.linkItem}>
              <span>Atualizar Corridas</span>
            </Link>
          </ItemSubMenu>
        </SubMenu>
        <SubMenu
          defaultOpen={false}
          label="Produtos"
          icon={<FiShoppingBag />}
          className={styles.subMenu}
        >
          <ItemSubMenu>
            <Link className={styles.linkItem} to="/admin/allProduct">
              <span>Geral Produtos</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link className={styles.linkItem} to="/admin/creatProduct">
              <span>Criar Produtos</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/admin/productlist"} className={styles.linkItem}>
              <span>Lista Produtos</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/admin/uptadeProduct"} className={styles.linkItem}>
              <span>Atualizar Produtos</span>
            </Link>
          </ItemSubMenu>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
}
