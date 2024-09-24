import { PropTypes } from "prop-types";
import styles from "./chatSent.module.css";
import useContexts from "../../hooks/useContext";

export default function ChatSent({ message }) {
  const { dataUser } = useContexts();

  return (
    <div className={styles.myBox}>
      <div className={styles.myUserChat}>
        <div className={styles.myData}>
          <img src={dataUser.profile_picture} alt="Foto de usuário" />
          <p>Eu</p>
        </div>
        <p className={styles.myMessage}>{message}</p>
      </div>
    </div>
  );
}

ChatSent.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  message: PropTypes.string,
};
