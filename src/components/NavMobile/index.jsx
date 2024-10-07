import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import {
  FaFlagCheckered,
  FaGamepad,
  FaRegHeart,
  FaShoppingBag,
  FaUsers,
  FaRegUser,
} from "react-icons/fa";
import { Menu, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navMobile.module.css";
import { LiaMedalSolid } from "react-icons/lia";
import { BiSolidCategory } from "react-icons/bi";
import formulaEImage from "/assets/logo-formulaE.png";
import { IoMenu } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import useContexts from "../../hooks/useContext";

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
  const navigate = useNavigate();
  const [toggled, setToggled] = useState(false);
  const [user, setUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const { setDataUser } = useContexts();
  const handleMenuItemClick = (event) => {
    event.preventDefault();
  };

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
            defaultOpen={false}
            label={
              <div className={styles.userInfo}>
                <span className={styles.userName}> {nameUser}</span>
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
            onClick={handleMenuItemClick}
          >
            <ItemSubMenu>
              <Link
                className={styles.linkItemProfile}
                onClick={() => setToggled(!toggled)}
                to={"/race/profile"}
              >
                {/* <img src={usaFlag} alt="EUA flag" className={styles.flagIcon} /> */}
                <FaRegUser />

                <p>Perfil</p>
              </Link>
            </ItemSubMenu>
            <ItemSubMenu>
              <Link
                className={styles.linkItemProfile}
                onClick={() => setToggled(!toggled)}
                to={"/race/favorites"}
              >
                {/* <img src={usaFlag} alt="EUA flag" className={styles.flagIcon} /> */}
                <FaRegHeart />

                <p>Favoritos</p>
              </Link>
            </ItemSubMenu>
            <ItemSubMenu>
              <Link className={styles.linkItemProfile} onClick={handleLogout}>
                <IoIosLogOut />
                <p>Logout</p>
              </Link>
            </ItemSubMenu>
          </SubMenu>
          <div className="navegation">
            <ItemMenu>
              <Link
                to="/race"
                className={styles.itemMenu}
                onClick={() => setToggled(!toggled)}
              >
                <BiSolidCategory />
                <p>Home</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link
                to="/race/teams"
                className={styles.itemMenu}
                onClick={() => setToggled(!toggled)}
              >
                <FaUsers />
                <p>Equipes</p>
              </Link>
            </ItemMenu>
            <SubMenu
              defaultOpen={false}
              label="Corridas"
              icon={<FaFlagCheckered />}
              className={styles.subMenu}
              onClick={handleMenuItemClick}
            >
              <ItemSubMenu>
                <Link
                  className={styles.linkItem}
                  to="/race/races"
                  onClick={() => setToggled(!toggled)}
                >
                  <span>Corridas</span>
                </Link>
              </ItemSubMenu>
              <ItemSubMenu>
                <Link
                  to={"/race/live-race"}
                  className={styles.linkItem}
                  onClick={() => setToggled(!toggled)}
                >
                  <span>Corrida ao vivo</span>
                </Link>
              </ItemSubMenu>
              <ItemSubMenu>
                <Link
                  to={"/race/luck-kick"}
                  className={styles.linkItem}
                  onClick={() => setToggled(!toggled)}
                >
                  <span>Chute da sorte</span>
                </Link>
              </ItemSubMenu>
            </SubMenu>
            <ItemMenu>
              <Link
                to="/race/marketplace"
                className={styles.itemMenu}
                onClick={() => setToggled(!toggled)}
              >
                <FaShoppingBag />
                <p>Marketplace</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link
                to="/race/quiz"
                className={styles.itemMenu}
                onClick={() => setToggled(!toggled)}
              >
                <FaGamepad />
                <p>Quiz</p>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link
                to="/race/ranking"
                className={styles.itemMenu}
                onClick={() => setToggled(!toggled)}
              >
                <LiaMedalSolid />
                <p>Ranking</p>
              </Link>
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
