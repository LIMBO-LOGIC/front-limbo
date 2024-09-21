import { CiSearch } from "react-icons/ci";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import useContexts from "../../hooks/useContext";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const { setDataUser } = useContexts();

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("userStorage"));
    if (userStorage) {
      setNameUser(userStorage.name.split(" ")[0]);
      setUser(userStorage);
      setDataUser(userStorage);
    }
  }, [setDataUser]);

  const handleLogout = () => {
    localStorage.removeItem("userStorage");
    navigate('/login')
  }

  return (
    <header>
      <div className={styles.searchWrapper}>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          className={styles.searchInput}
        />
        <CiSearch className={styles.searchIcon} />
      </div>
      <div className={styles.userProfile}>
        <img
          src={user.image_user}
          alt="User profile"
          className={styles.userImage}
          onClick={() => navigate("/race/profile")}
        />
        <div
          className={styles.userInfo}
          onClick={() => navigate("/race/profile")}
        >
          <span className={styles.userName}>{nameUser}</span>
          <span className={styles.userPoints}>{user.all_points} pontos</span>
        </div>
        <div className={styles.logout}>
          <IoIosLogOut onClick={handleLogout}/>
        </div>
      </div>
    </header>
  );
}
