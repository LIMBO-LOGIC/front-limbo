import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import useContexts from "../../hooks/useContext";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { baseUrl } from "../../service/api";

export default function Header() {
  const navigate = useNavigate();
  const [nameUser, setNameUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { setDataUser,dataUser ,setIsLoading } = useContexts();
  const menuRef = useRef(null); // Ref para o menu

  const checkIf24HoursPassed = (lastDate) => {
    const currentDate = new Date();
    const lastFetchDate = new Date(lastDate);
    const diffInMs = currentDate - lastFetchDate; // Diferença em milissegundos
    const diffInHours = diffInMs / (1000 * 60 * 60); // Converter para horas
    return diffInHours >= 24; // Retorna true se passaram 24 horas
  };

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));

    if (userStorage) {
      setNameUser(userStorage.fullname.split(" ")[0]);
      setDataUser(userStorage);
    }

    if (checkIf24HoursPassed(userStorage.dateSalved)) {
      setIsLoading(true);
      axios
        .get(`${baseUrl}/user/${userStorage.id}`)
        .then((response) => {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString();

          let json = response.data;
          json.dateSalved = formattedDate;

          setNameUser(json.fullname.split(" ")[0]);
          setDataUser(json);
          localStorage.setItem("userStorage", JSON.stringify(json));
        })
        .catch((error) => {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setDataUser, setIsLoading]);

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
          src={dataUser.profile_picture}
          alt="User profile"
          className={styles.userImage}
          onClick={() => navigate("/race/profile")}
        />
        <div className={styles.userInfo}>
          <span className={styles.userGreeting}>Olá, {nameUser}</span>
          <span className={styles.userPoints}>
            {dataUser.current_points} pontos
          </span>
        </div>
        {/* <AiOutlineArrowDown className={styles.arrow} onClick={toggleMenu} /> */}
        <AiOutlineArrowDown
          onClick={toggleMenu}
          className={`${styles.arrow} dropdown-toggle`}
          data-bs-auto-close="outside"
          aria-expanded="false"
          data-bs-toggle="dropdown"
        />
        <ul
          className="dropdown-menu links-drop mt-3"
          aria-labelledby="dropdownMenuButton"
        >
          <li>
            <Link
              to={"/race/favorites"}
              className={`${styles.menuItem} dropdown-item`}
            >
              <FaRegHeart size={18} />
              Favoritos
            </Link>
          </li>
          <li>
            <div
              className={`${styles.menuItem} dropdown-item`}
              onClick={handleLogout}
            >
              <FiLogOut size={18} />
              Sair
            </div>
          </li>
        </ul>
      </div>

      {/* {menuOpen && (
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
      )} */}
    </header>
  );
}
