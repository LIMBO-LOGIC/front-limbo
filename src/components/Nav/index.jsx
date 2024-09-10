import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import formulaEImage from '../../../public/assets/logo-formulaE.png';
import userProfilePic from '../../../public/assets/user-profile.png';
import usaFlag from '../../../public/assets/usa-flag.png';
import styles from './Nav.module.css';
import { GiHamburgerMenu } from 'react-icons/gi'; 

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <img src={formulaEImage} alt='logo formula e' className={styles.logo} />
        <button className={styles.hamburger} onClick={toggleMenu}>
          <GiHamburgerMenu />
        </button>
      </div>

      <div className={`${styles.right} ${isOpen ? styles.open : ''}`}>
        <div className={styles.searchWrapper}>
          <input
            type='search'
            name='search'
            id='search'
            placeholder='Search...'
            className={styles.searchInput}
          />
          <CiSearch className={styles.searchIcon} />
        </div>

        <div className={styles.languageSelector}>
          <img src={usaFlag} alt='EUA flag' className={styles.flagIcon} />
        </div>

        <div className={styles.userProfile}>
          <img
            src={userProfilePic}
            alt='User profile'
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <span className={styles.userName}>Cezar</span>
            <span className={styles.userPoints}>120 pontos</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
