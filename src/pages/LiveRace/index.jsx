import { BsChatDots } from "react-icons/bs";
import styles from "./liveRace.module.css";
import { PropTypes } from "prop-types";
import { IoSend } from "react-icons/io5";
import circuit from "../../assets/racing_live_race.png";
import userPhoto from "../../assets/user_profile.png";
import PageTitle from "../../components/PageTitle";

const ChatSent = ({ name, photo, message }) => {
  return (
    <div className={styles.myBox}>
      <div className={styles.myUserChat}>
        <div hidden>{`${name} ${photo} ${message}}`}</div>
        <div className={styles.myData}>
          <img src={userPhoto} alt="Foto de usuário" />
          <p>Luiz Gustavo</p>
        </div>
        <p className={styles.myMessage}>{message}</p>
      </div>
    </div>
  );
};

const ChatReceived = ({ name, photo, message }) => {
  return (
    <div className={styles.boxMessage}>
      <div className={styles.userChat}>
        <div hidden>{`${name} ${photo} ${message}}`}</div>
        <div className={styles.dataUser}>
          <img src={userPhoto} alt="Foto de usuário" />
          <p>Luiz Gustavo</p>
        </div>
        <p className={styles.messageUser}>{message}</p>
      </div>
    </div>
  );
};

ChatSent.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  message: PropTypes.string,
};

ChatReceived.propTypes = {
  name: PropTypes.string,
  photo: PropTypes.string,
  message: PropTypes.string,
};

export default function LiveRace() {
  const sendMessage = () => {};

  return (
    <section className={styles.liveRace}>
      <PageTitle text={'Corrida ao vivo'}/>
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
              <div className={styles.listMessages} id="listMessage">
                <ChatSent
                  message={"Bom dia, hoje eu vou acertar ! - eu"}
                />
                <ChatReceived
                  message={"Bom dia, hoje eu vou acertar !"}
                />
              </div>
              <div className={styles.boxSendMessage}>
                <input type="text" placeholder="Digite aqui" />
                <IoSend />
              </div>
            </div>
          </div>
          <button onClick={sendMessage} className={styles.btnLucky}>
            Realizar chute da sorte
          </button>
        </div>
      </div>
      <div className={styles.boxCircuit}>
        <h2>Pista</h2>
        <img src={circuit} alt="Imagem da pista de Londres" />
      </div>
    </section>
  );
}
