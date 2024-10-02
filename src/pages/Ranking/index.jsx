import { useEffect, useState } from "react"; // Importando hooks
import CardRanking from "../../components/CardRanking";
import LineRanking from "../../components/LineRanking";
import PageTitle from "../../components/PageTitle";
import axios from "axios"; // Importando axios
import { baseUrl } from "../../service/api"; // Certifique-se de ter o baseUrl configurado corretamente

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]); // Estado para armazenar dados do ranking

  useEffect(() => {
    // Chamada para o endpoint
    axios
      .get(`${baseUrl}/user/points`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setRankingData(response.data); // Atualizando o estado com os dados recebidos
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <PageTitle text={`Ranking`} />
      <CardRanking rankingData={rankingData} />{" "}
      {/* Passando dados para CardRanking */}
      <LineRanking rankingData={rankingData} />{" "}
      {/* Passando dados para LineRanking */}
    </>
  );
}
