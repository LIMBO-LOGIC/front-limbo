import { BsChatDots } from "react-icons/bs";
import styles from "./liveRace.module.css";
import { IoSend } from "react-icons/io5";
import circuit from "../../assets/racing_live_race.png";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import ChatReceived from "../../components/ChatReceived";
import ChatSent from "../../components/ChatSent";
import { io } from "socket.io-client";
import { urlChat } from "../../service/api";

const socket = io(urlChat, {
  path: "/clients/socketio/hubs/Hub",
});

export default function LiveRace() {
  const [temperature, setTemperature] = useState("0°C");
  const [humidity, setHumidity] = useState("0");
  const [luminosity, setLuminosity] = useState("0nux");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState({ user_id: 1, name_user: 'Luiz', image_user: 'https://example.com/avatar.png' });

  const handleChangeData = () => {
    setTemperature("24°C");
    setHumidity("94");
    setLuminosity("500lux");
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("userStorage");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }

    socket.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
      socket.emit('list_message', '66ecae9379ef6d8440299c6d')
    });

    socket.on("chat_list", (chats) => {
      console.log(chats);
    });

    socket.on("previousMessages", (oldMessages) => {
      setMessages(oldMessages.data);
      console.log(oldMessages.data)
    });

    socket.on("newMessage", (message) => {
      console.log(message);
      setMessages((prevMessages) => [message,...prevMessages]);
    });

    return () => {
      socket.off('connect');
      socket.off('previousMessages'); // Remova a escuta ao desconectar
    socket.off('newMessage'); // Remova a escuta ao desconectar
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        ...user,
        message: newMessage,
        chat_id: "66ecae9379ef6d8440299c6d",
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
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
                  msg.user_id === user.user_id ? (
                    <ChatSent key={index} message={msg.message} />
                  ) : (
                    <ChatReceived key={index} name={msg.name_user} message={msg.message} />
                  )
                )}
              </div>
              <div className={styles.boxSendMessage}>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IoSend
                  style={{ cursor: "pointer" }}
                  onClick={sendMessage}
                />
              </div>
            </div>
          </div>
          <button className={styles.btnLucky}>Realizar chute da sorte</button>
        </div>
      </div>
      <div className={styles.boxCircuit}>
        <h2>Pista</h2>
        <img src={circuit} alt="Imagem da pista de Londres" />
        <div className={`${styles.containerInfoCircuit} row`}>
          <div className={`${styles.locationCircuit} col-md-4`}>
            <label className="mb-1">Localização</label>
            <select
              name="location"
              id="location"
              className={`form-control ${styles.inputLocation}`}
              onChange={handleChangeData}
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
            <label className={`form-label ${styles.labelData}`}>Umidade</label>
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

      <div className={styles.boxPilots}>
        <div className="table-responsive">
          <table
            className="table table-hover caption-top"
            style={{ whiteSpace: "nowrap" }}
          >
            <caption>Pilotos</caption>
            <thead className="table-dark">
              <tr>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Selecionar
                </th>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Classificação
                </th>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Pontos
                </th>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Carro
                </th>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Equipe
                </th>
                <th className="col text-center" style={{ cursor: "pointer" }}>
                  Piloto
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td className="text-center">Seta</td>
                <td className="text-center">Primeiro</td>
                <td className="text-center">198</td>
                <td className="text-center">Carro</td>
                <td className="text-center">Equipe</td>
                <td className="text-center">11 Lucas Di Grassi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
