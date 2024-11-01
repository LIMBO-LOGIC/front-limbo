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
  const [resultPilots, setResultPilots] = useState([]); // Estado para armazenar os resultados
  const [resultSaved, setResultSaved] = useState(false); // Flag para indicar se o resultado foi salvo

  useEffect(() => {
    // Carregar informações da corrida
    axios
      .get(`${baseUrl}/racing/${idRace}`, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        setRace(response.data);
        setResultSaved(response.data.resultSaved || false); // Atualiza com o valor salvo
      })
      .catch((error) => console.log(error));

    const endpoint =
      idRacingBet == 0
        ? `${urlAPIChat}race/pilots`
        : `${baseUrl}/racing-bets/${idRacingBet}`;

    // Carregar pilotos
    axios
      .get(endpoint, { headers: { accept: "application/json" } })
      .then((response) => {
        const data =
          idRacingBet == 0
            ? response.data.data
            : JSON.parse(response.data.list_pilots);
        setPilots(data);
      })
      .catch((error) => console.log(error));

    // Carregar resultados
    if (idRacingBet !== "0") {
      console.log("idRacingBet:", idRacingBet); // Log do idRacingBet
      axios
        .get(`${baseUrl}/racing-bets/${idRacingBet}`, {
          headers: { accept: "application/json" },
        })
        .then((response) => {
          console.log("Resultado da requisição de resultados:", response.data); // Log da resposta
          if (response.data.list_pilots) {
            const resultData = JSON.parse(response.data.list_pilots);
            console.log("Dados de resultados processados:", resultData); // Log dos dados processados
            setResultPilots(resultData); // Armazena os resultados na variável state
          } else {
            console.log("list_pilots não está definido no response.data");
          }
        })
        .catch((error) =>
          console.log("Erro na requisição de resultados:", error)
        );
    }
  }, [idRace, idRacingBet]);

  const saveRacingBet = () => {
    setIsLoading(true);
    const body = {
      racingId: idRace,
      userId: dataUser.id,
      listPilots: JSON.stringify(pilots),
    };

    console.log("Body da requisição:", body);

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
          <Sortable isMove={!resultSaved} items={pilots} setItems={setPilots} />
        </div>

        <div className={styles.resultContainer}>
          <div className={styles.titles}>
            <h2>Resultado</h2>
          </div>
          {resultPilots.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            <Sortable
              isMove={false}
              items={resultPilots}
              setItems={setResultPilots}
            />
          )}
        </div>
      </div>
    </section>
  );
}
