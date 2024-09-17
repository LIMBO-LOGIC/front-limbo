import { BsChatDots } from "react-icons/bs";
import styles from "./liveRace.module.css";
import { PropTypes } from "prop-types";
import { IoSend } from "react-icons/io5";

UserChat.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  message: PropTypes.string,
  isMy: PropTypes.bool,
};

const UserChat = ({ name, photo, message, isMy }) => {
  return (
    <div className={styles.userChat}>
      <div hidden>{`${name} ${photo} ${message} ${isMy}`}</div>
      <div className={styles.dataUser}>
        <img src="" alt="" />
        <p>Luiz Gustavo</p>
      </div>
      <p className={styles.messageUser}></p>
    </div>
  );
};

export default function LiveRace() {
  return (
    <section className={styles.liveRace}>
      <h1>Corrida ao vivo</h1>
      <div className={styles.boxLiveRace}>
        <iframe
          width="100%"
          height="600px"
          style={{ borderRadius: "10px" }}
          src="https://www.youtube.com/embed/uxbhAetF5Vg?si=4xtF4srV0NwHNbTZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div className={styles.containerChat}>
          <div className={styles.boxChat}>
            <div className={styles.title}>
              <BsChatDots />
              <p>Chat ao vivo</p>
            </div>
            <div className={styles.chat}>
              <div className={styles.listMessages}>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
                <button className={styles.btnLucky}>
                  Realizar chute da sorte
                </button>
              </div>
              <div className={styles.boxSendMessage}>
                <input type="text" placeholder="Digite aqui" />
                <IoSend />
              </div>
            </div>
          </div>
          <button className={styles.btnLucky}>Realizar chute da sorte</button>
        </div>
      </div>
    </section>
  );
}
