import { PropTypes } from "prop-types";
import styles from "./chatReceived.module.css";

export default function ChatReceived({ name, photo, message }) {
  return (
    <div className={styles.boxMessage}>
      <div className={styles.userChat}>
        <div className={styles.dataUser}>
          <img src={photo} alt="Foto de usuário" />
          <p>{name}</p>
        </div>
        <p className={styles.messageUser}>{message}</p>
      </div>
    </div>
  );
}

ChatReceived.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  message: PropTypes.string,
};
