import { useEffect, useState } from "react";
import styles from "./adminchoiceLucky.module.css";
import { baseUrl, urlAPIChat } from "../../service/api";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import Sortable from "../../components/SortableList";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";

export default function AdminChoiceLucky() {
  const navigate = useNavigate();

  const { idRace, idRacingBet } = useParams();
  const { setIsLoading, dataUser } = useContexts();
  const [race, setRace] = useState("");
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/racing/${idRace}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        setRace(response.data);
        // setPilots(response.data.data[0].pilots);
      })
      .catch((error) => {
        console.log(error);
      });

    if (idRacingBet == 0) {
      axios
        .get(`${urlAPIChat}race/pilots`, {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setPilots(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${baseUrl}/racing-bets/${idRacingBet}`, {
          headers: {
            accept: "application/json",
          },
        })
        .then((response) => {
          setPilots(JSON.parse(response.data.list_pilots));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setRace, idRace, setPilots, idRacingBet]);

  const saveRacingBet = () => {
    setIsLoading(true);
    const body = {
      racingId: idRace,
      userId: dataUser.id,
      listPilots: JSON.stringify(pilots),
    };

    console.log(body);

    axios
      .post(`${baseUrl}/racing-bets`, body)
      .then((response) => {
        console.log(response.data);
        if (window.innerWidth >= 768) {
          toast.success("Chute realizado com sucesso!");
        }
        navigate("/race/luck-kick");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className={styles.choiceLucky}>
      <PageTitle
        text={
          race == ""
            ? "Carregando ..."
            : `Round ${race.round} - ${race.circuit_location}`
        }
      />
      <div className={styles.titles}>
        <h2>Pilotos</h2>
        <button
          className={styles.btnSalve}
          onClick={idRacingBet == 0 ? saveRacingBet : () => {}}
          style={
            idRacingBet != 0
              ? {
                  background: "rgba(0, 0, 90, 0.78)",
                  cursor: "default",
                }
              : {}
          }
        >
          {idRacingBet == 0 ? "Salvar" : "Salvo"}
        </button>
      </div>
      <Sortable isMove={idRacingBet == 0} items={pilots} setItems={setPilots} />
    </section>
  );
}
