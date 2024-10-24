import { useEffect, useState } from "react";
import useContexts from "../../hooks/useContext";
import styles from "./adminHome.module.css"
import axios from "axios";
import { baseUrl } from "../../service/api";

export default function AdminHome() {
    const [nextRace, setNextRace] = useState(null);
    const { setIsLoadingAdmin } = useContexts();
  
    useEffect(() => {
      setIsLoadingAdmin(true);
      axios
        .get(`${baseUrl}/racing/nearest`)
        .then((response) => {
          console.log(response.data)
          setNextRace(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoadingAdmin(false);
          }, 1000);
        });
    }, [setNextRace, setIsLoadingAdmin])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: '2-digit', month: 'long' };
        return date.toLocaleDateString('pt-BR', options);
      };

    return (
        <section className={`${styles.home}`}>
            <div className={styles.nextRace}>
                <img
                    src={nextRace?.circuit_image}
                    alt="Circuito da corrida"
                    className={styles.racingCircuit}
                />
                <div className={styles.dataRace}>
                    <p className={styles.title}>Próxima Corrida:</p>
                    <div className={styles.locationRace}>
                        <img
                            src={nextRace?.country_flag}
                            alt="Bandeira do país do circuito"
                            className={styles.countryFlag}
                        />
                        <div className={styles.line}></div>
                        <div className={styles.raceText}>
                            <p className={styles.location}>{nextRace?.circuit_location}</p>
                            <p className={styles.round}>{nextRace && formatDate(nextRace?.race_date)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}