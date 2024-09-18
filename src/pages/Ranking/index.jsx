import CardRanking from "../../components/CardRanking";
import LineRanking from "../../components/LineRanking";
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";

export default function Ranking() {
  return (
    <>
      <PageTitle text={`Ranking`} />
      <CardRanking />
      <LineRanking />
      <Footer />
    </>
  );
}
