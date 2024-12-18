import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import styles from "./nav.module.css";
import formulaEImage from "/assets/logo-formulaE.png";
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

export default function Nav() {
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
            <p>Home</p>
          </Link>
        </ItemMenu>
        <ItemMenu>
          <Link to="/race/teams" className={styles.itemMenu}>
            <FaUsers />
            <p>Equipes</p>
          </Link>
        </ItemMenu>
        <SubMenu
          defaultOpen={false}
          label="Corridas"
          icon={<FaFlagCheckered />}
          className={styles.subMenu}
        >
          <ItemSubMenu>
            <Link className={styles.linkItem} to="/race/races">
              <span>Corridas</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/race/live-race"} className={styles.linkItem}>
              <span>Corrida ao vivo</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link to={"/race/luck-kick"} className={styles.linkItem}>
              <span>Chute da sorte</span>
            </Link>
          </ItemSubMenu>
        </SubMenu>

        <SubMenu
          defaultOpen={false}
          label="Marketplace"
          icon={<FaShoppingBag />}
          className={styles.subMenu}
        >
           <ItemSubMenu>
            <Link className={styles.linkItem} to="/race/sales-points">
              <span>Compra de pontos</span>
            </Link>
          </ItemSubMenu>
          <ItemSubMenu>
            <Link className={styles.linkItem} to="/race/marketplace">
              <span>Resgate de produtos</span>
            </Link>
          </ItemSubMenu>
        </SubMenu>
        {/* <ItemMenu>
          <Link to="/race/marketplace" className={styles.itemMenu}>
            <FaShoppingBag />
            <p>Marketplace</p>
          </Link>
        </ItemMenu> */}
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
