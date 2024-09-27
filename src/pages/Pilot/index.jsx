import styles from "./pilot.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IP_ADRESS_IOT, urlAPIChat } from "../../service/api";
import useContexts from "../../hooks/useContext";

export default function Pilot() {
  const [pilot, setPilot] = useState("");
  const [nameImg, setNameImg] = useState("");
  const [dataCar, setDataCar] = useState();
  const [color, setColor] = useState("");
  const { id } = useParams();
  const { setIsLoading } = useContexts();

  useEffect(() => {
    const handleChangeData = async () => {
      axios
        .get(
          `http://${IP_ADRESS_IOT}:1026/v2/entities/urn:ngsi-ld:Car:${id}/attrs`,
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
          setDataCar(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    handleChangeData();

    const intervalId = setInterval(handleChangeData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${urlAPIChat}race/pilots/${id}`)
      .then((response) => {
        setPilot(response.data.data[0]);
        setColor(response.data.data[0].color_team);
        setNameImg(
          `https://res.cloudinary.com/drwk6ohcn/image/upload/v1727363509/Pilots/${response.data.data[0].name
            .toLowerCase()
            .replaceAll(" ", "-")}.png`
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setPilot, id, setIsLoading]);

  const stylePilot = {
    color: color,
  };

  return (
    <section className={styles.pagePilot}>
      <div className={styles.pilot}>
        <div className={styles.boxImg}>
          <img src={nameImg} alt="Imagem do piloto" />
        </div>
        <div className={styles.boxTitle}>
          <h1>
            {pilot.name_pilot} <strong>{pilot.last_name_pilot}</strong>
          </h1>
          <h2>
            TEAM <strong>{pilot.team}</strong>
          </h2>
        </div>
      </div>
      <div className={styles.boxCar}>
        <div className={styles.texts}>
          <p>Team car</p>
          <h3 style={stylePilot}>{pilot.team_car}</h3>
        </div>
        <div className={styles.imgCar}>
          <img src={pilot.image_car} alt="Imagem do carro" />
        </div>
      </div>
      <div className={styles.valuesCar}>
        <div
          className={styles.cardValue}
          style={{ border: `1px solid ${stylePilot.color}73` }}
        >
          <p className={styles.titleCard} style={{ color: color }}>
            Velocidade
          </p>
          <p className={styles.valueCard} style={stylePilot}>
          {dataCar ? dataCar.speed.value : '0.0'}<strong style={{ opacity: 0.52 }}>Km/h</strong>
          </p>
        </div>
        <div
          className={styles.cardValue}
          style={{ border: `1px solid ${stylePilot.color}73` }}
        >
          <p className={styles.titleCard} style={{ color: color }}>
            Temperatura
          </p>
          <p className={styles.valueCard} style={stylePilot}>
            {dataCar ? dataCar.temperature.value : '0'}<strong style={{ opacity: 0.52 }}>ºC</strong>
          </p>
        </div>
        <div
          className={styles.cardValue}
          style={{ border: `1px solid ${stylePilot.color}73` }}
        >
          <p className={styles.titleCard} style={{ color: color }}>
            Luminosidade
          </p>
          <p className={styles.valueCard} style={stylePilot}>
          {dataCar ? dataCar.luminosity.value : '0'}<strong style={{ opacity: 0.52 }}>lux</strong>
          </p>
        </div>
        <div
          className={styles.cardValue}
          style={{ border: `1px solid ${stylePilot.color}73` }}
        >
          <p className={styles.titleCard} style={{ color: color }}>
            Umidade
          </p>
          <p className={styles.valueCard} style={stylePilot}>
          {dataCar? dataCar.humidity.value : '0'}<strong style={{ opacity: 0.52 }}>%</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
