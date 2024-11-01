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
  const { idRace } = useParams();
  const { setIsLoading } = useContexts();
  const [race, setRace] = useState("");
  const [pilots, setPilots] = useState([]);
  const [resultSaved, setResultSaved] = useState(false); // flag para indicar se o resultado foi salvo
  const [userId, setUserId] = useState(null); // para armazenar o ID do usuário

  useEffect(() => {
    // Carregar informações da corrida
    axios
      .get(`${baseUrl}/racing-bets/${idRace}`, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        setRace(response.data);
        setResultSaved(response.data.resultSaved || false);
        setUserId(response.data.user.id); // Armazenar o ID do usuário
      })
      .catch((error) => {
        console.log(error);
      });

    // Carregar pilotos
    axios
      .get(`${urlAPIChat}race/pilots`, {
        headers: { accept: "application/json" },
      })
      .then((response) => setPilots(response.data.data))
      .catch((error) => console.log(error));
  }, [idRace]);

  const saveRacingBet = () => {
    setIsLoading(true);
    const body = {
      racingId: idRace,
      userId: userId, // Adicionando ID do usuário
      listPilots: JSON.stringify(pilots),
      resultSaved: true, // define que o resultado foi salvo
    };

    console.log("Body da requisição:", body); // Log para inspecionar o conteúdo do body

    axios
      .post(`${baseUrl}/racing-bets`, body)
      .then((response) => {
        toast.success("Resultado salvo com sucesso!");
        setResultSaved(true); // atualiza o estado para indicar que o resultado foi salvo
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
      <div className={styles.titles}>
        <h2>Pilotos</h2>
        <button
          className={styles.btnSave}
          onClick={!resultSaved ? saveRacingBet : () => {}}
          style={
            resultSaved
              ? { background: "rgba(0, 0, 90, 0.78)", cursor: "default" }
              : {}
          }
        >
          {resultSaved ? "Resultado Salvo" : "Salvar"}
        </button>
      </div>
      <Sortable isMove={!resultSaved} items={pilots} setItems={setPilots} />
    </section>
  );
}
