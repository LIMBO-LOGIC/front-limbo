import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillHouseFill } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import { RiDiceLine } from "react-icons/ri";
import styles from "./adminNavMobile.module.css";
import formulaEImage from "/assets/logo_formulaE_branca.png";
import useContexts from "../../hooks/useContext";
import { FiLogOut } from "react-icons/fi";

const ItemMenu = ({ children, to }) => (
  <li className="ps-menuitem-root css-1t8x7v1">
    <Link to={to} className={styles.itemMenu}>
      <div className="ps-menu-button" tabIndex="0">
        <div className={styles.menuContent}>{children}</div>
      </div>
    </Link>
  </li>
);

ItemMenu.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
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
    navigate("/#");
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
            <ItemMenu to="/admin/">
              <BsFillHouseFill />
              <p>Home</p>
            </ItemMenu>
            <ItemMenu to="/admin/raceList">
              <FaFlagCheckered />
              <p>Corridas</p>
            </ItemMenu>
            <ItemMenu to="/admin/productlist">
              <FiShoppingBag />
              <p>Produtos</p>
            </ItemMenu>
            <ItemMenu to="/admin/raceBet">
              <RiDiceLine />
              <p>Chute da sorte</p>
            </ItemMenu>
            <ItemMenu>
              <FiLogOut size={18} />
              <p onClick={handleLogout}>Logout</p>
            </ItemMenu>
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
