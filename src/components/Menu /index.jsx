import { RiTeamLine } from 'react-icons/ri'; // Correto

import { FaFlagCheckered, FaShoppingBag, FaGamepad } from 'react-icons/fa'; // Verifique se o ícone FaShoppingBag é o correto

import { IoChatboxEllipsesOutline, IoHomeOutline } from 'react-icons/io5'; // Correto

import styles from './Menu.module.css';

export default function Menu() {
  return (
    <div className={styles.menuContainer}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <IoHomeOutline className={styles.menuIcon} />
          <span>Home</span>
        </li>
        <li className={styles.menuItem}>
          <RiTeamLine className={styles.menuIcon} />
          <span>Equipes</span>
        </li>
        <li className={styles.menuItem}>
          <FaFlagCheckered className={styles.menuIcon} />
          <span>Corrida</span>
        </li>
        <li className={styles.menuItem}>
          <FaShoppingBag className={styles.menuIcon} />
          <span>Marketplace</span>
        </li>
        <li className={styles.menuItem}>
          <IoChatboxEllipsesOutline className={styles.menuIcon} />
          <span>Fórum</span>
        </li>
        <li className={styles.menuItem}>
          <FaGamepad className={styles.menuIcon} />
          <span>Quiz</span>
        </li>
      </ul>
    </div>
  );
}
