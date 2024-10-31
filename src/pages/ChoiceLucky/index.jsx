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
  const [resultSaved, setResultSaved] = useState(false); // flag para indicar se o resultado foi salvo

  useEffect(() => {
    axios
      .get(`${baseUrl}/racing/${idRace}`, {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        setRace(response.data);
        setResultSaved(response.data.resultSaved || false); // atualiza com o valor salvo
      })
      .catch((error) => console.log(error));

    const endpoint =
      idRacingBet == 0
        ? `${urlAPIChat}race/pilots`
        : `${baseUrl}/racing-bets/${idRacingBet}`;
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
  }, [idRace, idRacingBet]);

  const saveRacingBet = () => {
    setIsLoading(true);
    const body = {
      racingId: idRace, // Certifique-se de que isso está sendo passado
      userId: dataUser.id, // Certifique-se de que dataUser.id não é undefined
      listPilots: JSON.stringify(pilots),
    };

    console.log("Body da requisição:", body); // Verifique o conteúdo do body

    axios
      .post(`${baseUrl}/racing-bets`, body)
      .then((response) => {
        toast.success("Chute realizado com sucesso!");
        navigate("/race/luck-kick");
      })
      .catch((error) => console.log("Erro na requisição:", error.response.data)) // Melhora o logging do erro
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
          <Sortable isMove={false} items={pilots} setItems={setPilots} />
        </div>
      </div>
    </section>
  );
}