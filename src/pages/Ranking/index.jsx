import { useEffect, useState } from "react";
import CardRanking from "../../components/CardRanking";
import LineRanking from "../../components/LineRanking";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import { baseUrl } from "../../service/api";
import styles from "./Ranking.module.css";
import { toast } from "react-toastify";
import useContexts from "../../hooks/useContext";

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const { setIsLoading } = useContexts();

  useEffect(() => {
    setIsLoading(true)
    const fetchRankingData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/points`, {
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
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
    };

    fetchRankingData();
  }, [setIsLoading]);

  return (

      <section className={styles.flexGrowSection}>
        <PageTitle text={`Ranking`} />
        <CardRanking rankingData={rankingData} />{" "}
        {/* Passando dados para CardRanking */}
        <LineRanking rankingData={rankingData} />{" "}
        {/* Passando dados para LineRanking */}
      </section>
  );
}
