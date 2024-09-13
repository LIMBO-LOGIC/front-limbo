import { CiSearch } from "react-icons/ci";
import styles from "./header.module.css";
import userProfilePic from "../../assets/user_profile.png";
import usaFlag from '/assets/usa-flag.png';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate()

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
        <div className={styles.languageSelector}>
          <img src={usaFlag} alt="EUA flag" className={styles.flagIcon} />
        </div>
        <img
          src={userProfilePic}
          alt="User profile"
          className={styles.userImage}
          onClick={() => navigate('/race/profile')}
        />
        <div className={styles.userInfo} onClick={() => navigate('/race/profile')}>
          <span className={styles.userName}>Cezar</span>
          <span className={styles.userPoints}>120 pontos</span>
        </div>
      </div>
    </header>
  );
}
