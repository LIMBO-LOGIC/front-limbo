import { BsChatDots } from "react-icons/bs";
import styles from "./liveRace.module.css";
import { IoSend } from "react-icons/io5";
import circuit from "../../assets/racing_live_race.png";
import PageTitle from "../../components/PageTitle";
import { useState } from "react";
import ChatReceived from "../../components/ChatReceived";
import ChatSent from "../../components/ChatSent";

export default function LiveRace() {
  const [inputMessage, setInputMessage] = useState("");
  const [temperature, setTemperature] = useState("0°C");
  const [humidity, setHumidity] = useState("0");
  const [luminosity, setLuminosity] = useState("0nux");
  const [messages, setMessages] = useState([
    { type: "sent", message: "Bom dia, hoje eu vou acertar! - eu" },
    { type: "received", message: "Bom dia, hoje eu vou acertar!" },
  ]);

  const sendMessage = () => {
    const newMessage = { type: "received", message: inputMessage };
    setInputMessage("");
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  };

  return (
    <section className={styles.liveRace}>
      <PageTitle text={"Corrida ao vivo"} />
      <div className={styles.boxLiveRace}>
        <iframe
          width="100%"
          height="600px"
          style={{ borderRadius: "10px" }}
          src="https://www.youtube.com/embed/uxbhAetF5Vg?si=4xtF4srV0NwHNbTZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className={styles.containerChat}>
          <div className={styles.boxChat}>
            <div className={styles.title}>
              <BsChatDots />
              <p>Chat ao vivo</p>
            </div>
            <div className={styles.chat}>
              <div className={styles.listMessages}>
                {messages.map((msg, index) =>
                  msg.type === "sent" ? (
                    <ChatSent key={index} message={msg.message} />
                  ) : (
                    <ChatReceived key={index} message={msg.message} />
                  )
                )}
              </div>
              <div className={styles.boxSendMessage}>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <IoSend style={{ cursor: "pointer" }} onClick={sendMessage} />
              </div>
            </div>
          </div>
          <button className={styles.btnLucky}>Realizar chute da sorte</button>
        </div>
      </div>
      <div className={styles.boxCircuit}>
        <h2>Pista</h2>
        <img src={circuit} alt="Imagem da pista de Londres" />
        <div className={styles.containerInfoCircuit}>
          <div className={`${styles.locationCircuit} col-md-4`}>
            <label className="mb-1">Localização</label>
            <select
              name="location"
              id="location"
              className={`form-control ${styles.inputLocation}`}
            >
              <option value="0" disabled selected>
                Selecione o ponto da pista
              </option>
              <option value="1">T1</option>
              <option value="2">T2</option>
              <option value="3">T3</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className={`form-label ${styles.labelData}`}>
              Temperatura
            </label>
            <input
              type="text"
              disabled
              name="temperature"
              id="temperature"
              className={`form-control ${styles.inputData}`}
              value={temperature}
            />
          </div>
          <div className="col-md-2">
            <label className={`form-label ${styles.labelData}`}>
              Umidade
            </label>
            <input
              type="text"
              disabled
              name="humidity"
              id="humidity"
              className={`form-control ${styles.inputData}`}
              value={humidity}
            />
          </div>
          <div className="col-md-2">
            <label className={`form-label ${styles.labelData}`}>
              Luminosidade
            </label>
            <input
              type="text"
              disabled
              name="luminosity"
              id="luminosity"
              className={`form-control ${styles.inputData}`}
              value={luminosity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
