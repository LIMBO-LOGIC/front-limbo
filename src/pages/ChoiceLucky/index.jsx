import { useEffect, useState } from "react";
import styles from "./choiceLucky.module.css";
import { baseUrl, urlAPIChat } from "../../service/api";
import axios from "axios";
import PageTitle from "../../components/PageTitle";
import { useNavigate, useParams } from "react-router-dom";
import Sortable from "../../components/SortableList";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";

export default function ChoiceLucky() {
  const navigate = useNavigate();
  const { idRace, idRacingBet } = useParams();
  const { setIsLoading, dataUser } = useContexts();
  const [race, setRace] = useState("");
  const [pilots, setPilots] = useState([]);
  const [resultPilots, setResultPilots] = useState([]);
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/racing/${idRace}`, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        setRace(response.data);

        if (response.data.result_racing !== "") {
          const resultData = JSON.parse(response.data.result_racing);
          setResultPilots(resultData);
        }
        setResultSaved(response.data.resultSaved || false);
      })
      .catch((error) => console.log(error));

    const endpoint =
      idRacingBet === "0"
        ? `${urlAPIChat}race/pilots`
        : `${baseUrl}/racing-bets/${idRacingBet}`;

    axios
      .get(endpoint, { headers: { accept: "application/json" } })
      .then((response) => {
        const data =
          idRacingBet === "0"
            ? response.data.data
            : JSON.parse(response.data.list_pilots);
        setPilots(data);
      })
      .catch((error) => console.log(error));
  }, [idRace, idRacingBet]);

  const saveRacingBet = () => {
    setIsLoading(true);
    const body = {
      racingId: idRace,
      userId: dataUser.id,
      listPilots: JSON.stringify(pilots),
    };

    axios
      .post(`${baseUrl}/racing-bets`, body)
      .then((response) => {
        toast.success("Chute realizado com sucesso!");
        navigate("/race/luck-kick");
      })
      .catch((error) => console.log("Erro na requisição:", error.response.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={styles.choiceLucky}>
      <PageTitle
        text={
          race === ""
            ? "Carregando ..."
            : `Round ${race.round} - ${race.circuit_location}`
        }
      />
      <div className={styles.flexContainer}>
        <div className={styles.pilotsContainer}>
          <div className={styles.titles}>
            <h2>Pilotos</h2>
            {!resultSaved && (
              <button className={styles.btnSave} onClick={saveRacingBet}>
                Salvar
              </button>
            )}
          </div>
          <Sortable
            isMove={!resultSaved && resultPilots.length === 0}
            items={pilots}
            setItems={setPilots}
            isResult={false}
            resultPilots={resultPilots} 
          />
        </div>

        {resultPilots.length > 0 && (
          <div className={styles.resultContainer}>
            <div className={styles.titles}>
              <h2>Resultado</h2>
            </div>
            <Sortable
              isMove={false}
              items={resultPilots}
              setItems={setResultPilots}
              isResult={true}
              resultPilots={resultPilots} 
            />
          </div>
        )}
      </div>
    </section>
  );
}
