import { PropTypes } from "prop-types";
import styles from "./chatSent.module.css";
import userPhoto from "../../assets/user_profile.png";

export default function ChatSent({ name, photo, message }){
    return (
      <div className={styles.myBox}>
        <div className={styles.myUserChat}>
          <div hidden>{`${name} ${photo} ${message}`}</div>
          <div className={styles.myData}>
            <img src={userPhoto} alt="Foto de usuário" />
            <p>Eu</p>
          </div>
          <p className={styles.myMessage}>{message}</p>
        </div>
      </div>
    );
  };
  

ChatSent.propTypes = {
    name: PropTypes.string,
    photo: PropTypes.string,
    message: PropTypes.string,
  };