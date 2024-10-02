import { useEffect, useState } from "react";
import CardRanking from "../../components/CardRanking";
import LineRanking from "../../components/LineRanking";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { baseUrl } from "../../service/api";
import styles from "./Ranking.module.css";
import LoadingOverlay from "react-loading-overlay-ts";
import { toast } from "react-toastify";

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/points`, {
          headers: {
            accept: "application/json",
          },
        });
        console.log(response.data);
        setRankingData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Erro ao carregar dados do ranking.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, []);

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Carregando..."
      wrapperStyle={{ height: "100vh" }}
      styles={{
        content: (base) => ({ ...base }),
      }}
    >
      <section className={styles.flexGrowSection}>
        <PageTitle text={`Ranking`} />
        <CardRanking rankingData={rankingData} />{" "}
        {/* Passando dados para CardRanking */}
        <LineRanking rankingData={rankingData} />{" "}
        {/* Passando dados para LineRanking */}
      </section>
    </LoadingOverlay>
  );
}
