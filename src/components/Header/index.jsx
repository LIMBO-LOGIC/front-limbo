import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState, useRef } from "react";
import useContexts from "../../hooks/useContext";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { setDataUser } = useContexts();
  const menuRef = useRef(null); // Ref para o menu

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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.userProfile}>
        <img
          src={user.profile_picture}
          alt="User profile"
          className={styles.userImage}
          onClick={() => navigate("/race/profile")}
        />
        <div className={styles.userInfo}>
          <span className={styles.userGreeting}>Olá, {nameUser}!</span>
          <span className={styles.userPoints}>
            {user.current_points} pontos
          </span>
        </div>
        <AiOutlineArrowDown className={styles.arrow} onClick={toggleMenu} />
      </div>

      {menuOpen && (
        <div ref={menuRef} className={styles.menu}>
          <Link to={"/race/favorites"} className={styles.menuItem}>
            <FaRegHeart className={styles.menuIcon} />
            <span> Favoritos</span>
          </Link>
          <div className={styles.menuItem} onClick={handleLogout}>
            <IoIosLogOut className={styles.menuIcon} />
            <span>Sair</span>
          </div>
        </div>
      )}
    </header>
  );
}
