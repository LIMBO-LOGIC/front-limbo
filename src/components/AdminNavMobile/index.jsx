import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./adminNavMobile.module.css";
import formulaEImage from "/assets/logo_formulaE_branca.png";
import useContexts from "../../hooks/useContext";

const ItemMenu = ({ children }) => (
  <li className="ps-menuitem-root css-1t8x7v1">
    <div className="ps-menu-button" tabIndex="0">
      <span className="ps-menu-label css-12w9als">{children}</span>
    </div>
  </li>
);

ItemMenu.propTypes = {
  children: PropTypes.node,
};

const ItemSubMenu = ({ children }) => (
  <li className="ps-menuitem-root css-1t8x7v1 pt-sub">
    <div className="ps-menu-button" tabIndex="0">
      <span className="ps-menu-label css-12w9als">{children}</span>
    </div>
  </li>
);

ItemSubMenu.propTypes = {
  children: PropTypes.node,
};

export default function AdminNavMobile() {
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);
  const [user, setUser] = useState({});
  const [nameUser, setNameUser] = useState("");
  const { setDataUser } = useContexts();

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));
    if (userStorage) {
      setNameUser(userStorage.fullname.split(" ")[0]);
      setUser(userStorage);
      setDataUser(userStorage);
    }
  }, [setDataUser]);

  const handleLogout = () => {
    localStorage.removeItem("userStorage");
    navigate("/login");
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
            label={
              <div className={styles.userInfo}>
                <span className={styles.userName}>{nameUser}</span>
                <span className={styles.userPoints}>
                  {user.current_points} pontos
                </span>
              </div>
            }
            icon={
              <img
                className={styles.userImage}
                src={user.profile_picture}
                alt="Imagem de usuário"
              />
            }
            className={styles.userProfile}
          >
            <SubMenu
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
                <Link className={styles.linkItem} to="/admin/productList">
                  <span>Lista Produtos</span>
                </Link>
              </ItemSubMenu>
              <ItemSubMenu>
                <Link className={styles.linkItem} to="/admin/uptadeProduct">
                  <span>Atualizar Produtos</span>
                </Link>
              </ItemSubMenu>
            </SubMenu>
          </SubMenu>
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
