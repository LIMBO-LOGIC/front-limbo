import { BsChatDots } from "react-icons/bs";
import styles from "./liveRace.module.css";
import { IoSend } from "react-icons/io5";
import circuit from "../../assets/racing_live_race.png";
import PageTitle from "../../components/PageTitle";
import { useEffect, useState } from "react";
import ChatReceived from "../../components/ChatReceived";
import ChatSent from "../../components/ChatSent";
import { IP_ADRESS_IOT, urlAPIChat, urlChat } from "../../service/api";
import axios from "axios";
import { TbArrowRightToArc } from "react-icons/tb";
import useContexts from "../../hooks/useContext";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io(urlChat, {
  path: "/clients/socketio/hubs/Hub",
});

export default function LiveRace() {
  const navigate = useNavigate()

  const [listPointsLocations, setListPointsLocations] = useState([]);
  const [pilotsRace, setPilotsRace] = useState([]);

  const [temperature, setTemperature] = useState("0°C");
  const [humidity, setHumidity] = useState("0");
  const [luminosity, setLuminosity] = useState("0");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { dataUser } = useContexts();

  useEffect(() => {    
    if (!socket.connected) {
      socket.connect();
    }else{
      socket.emit("list_message", "66ecae9379ef6d8440299c6d");
    }

    socket.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
      console.log('====================================');
      socket.emit("list_message", "66ecae9379ef6d8440299c6d");
      console.log('Enviou');
      console.log('====================================');
    });

    socket.on("previousMessages", (oldMessages) => {
      console.log(oldMessages.data);
      setMessages(oldMessages.data);
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      socket.off("previousMessages");
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    axios
      .get(`${urlAPIChat}race/pilots`)
      .then((response) => {
        console.log(response.data.data);
        setPilotsRace(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${urlAPIChat}locations/saopaulo`)
      .then((response) => {
        setListPointsLocations(response.data.data.devices);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setListPointsLocations, setPilotsRace]);

  const handleChangeData = async (location) => {
    axios
      .get(
        `http://${IP_ADRESS_IOT}:1026/v2/entities/urn:ngsi-ld:SaoPaulo:${location}/attrs`,
        {
          headers: {
            "fiware-service": "smart",
            "fiware-servicepath": "/",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setTemperature(response.data.temperature.value);
        setHumidity(`${response.data.humidity.value}%`);
        setLuminosity(response.data.luminosity.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        ...dataUser,
        message: newMessage,
        chat_id: "66ecae9379ef6d8440299c6d",
      };

      socket.emit("sendMessage", messageData);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      sendMessage(event);
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
          src="https://www.youtube.com/embed/uxbhAetF5Vg?autoplay=1&mute=1&start=1200"
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
                {messages.map((msg) =>
                  msg.user_id === dataUser.id ? (
                    <ChatSent key={msg._id} message={msg.message} />
                  ) : (
                    <ChatReceived
                      key={msg._id}
                      name={msg.nickname}
                      photo={msg.profile_picture}
                      message={msg.message}
                    />
                  )
                )}
              </div>
              <form className={styles.boxSendMessage} onKeyDown={handleKeyPress}>
                <input
                  type="text"
                  placeholder="Digite aqui"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IoSend style={{ cursor: "pointer" }} onClick={sendMessage} />
              </form>
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
              onChange={(e) => handleChangeData(e.target.value)}
            >
              <option value="0" disabled selected>
                Selecione o ponto da pista
              </option>
              {listPointsLocations.map((device) => {
                return (
                  <option
                    key={device.device_id}
                    value={device.device_id
                      .replace("saoPaulo", "")
                      .toUpperCase()}
                  >
                    {device.device_id.replace("saoPaulo", "")}
                  </option>
                );
              })}
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
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Selecionar
                </th>
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Classificação
                </th>
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Pontos
                </th>
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Carro
                </th>
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Equipe
                </th>
                <th
                  scope="col"
                  className="col text-center"
                  style={{ cursor: "pointer" }}
                >
                  Piloto
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {pilotsRace.map((pilot, index) => {
                return (
                  <tr
                    key={index}
                    className={`${styles.registerPilot}`}
                  >
                    <td className="text-center">
                      <div className={styles.tdDataArrow}>
                        <TbArrowRightToArc onClick={() => navigate(`/race/pilot/${pilot.id}`)}/>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className={styles.tdData}>{pilot.position}º</div>
                    </td>
                    <td className="text-center">
                      <div className={styles.tdData}>{pilot.points}</div>
                    </td>
                    <td className={`${styles.tdImgCar}`}>
                      <img
                        className={`${styles.imgCar}`}
                        src={pilot.image_car}
                        alt={`Image of the ${pilot.team} team's car`}
                      />
                    </td>
                    <td className="text-center">
                      <div className={styles.tdData}>{pilot.team}</div>
                    </td>
                    <td className="text-center">
                      <div className={styles.tdData}>
                        <p>
                          <strong>{pilot.number_pilot}</strong>{" "}
                          {pilot.name_pilot}{" "}
                          <strong>{pilot.last_name_pilot}</strong>
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
