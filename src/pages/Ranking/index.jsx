import CardRanking from "../../components/CardRanking";
import LineRanking from "../../components/LineRanking";
import PageTitle from "../../components/PageTitle";

export default function Ranking() {
  return (
    <>
      <PageTitle text={`Ranking`} />
      <CardRanking />
      <LineRanking />
    </>
  );
}
