import { PropTypes } from "prop-types";
import styles from "./chatReceived.module.css";
import userPhoto from "../../assets/user_profile.png";

export default function ChatReceived({ name, photo, message }) {
  return (
    <div className={styles.boxMessage}>
      <div className={styles.userChat}>
        <div hidden>{`${name} ${photo} ${message}`}</div>
        <div className={styles.dataUser}>
          <img src={userPhoto} alt="Foto de usuário" />
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
