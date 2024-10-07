import { useState, useEffect } from "react";
import styles from "./landingPage.module.css";
import NavMobile from "./NavMenuLandingPage";
import Footer from "../../components/Footer";
import tela_home from "../../assets/tela_home.png";
import tela_equipe from "../../assets/tela_equipe.png";
import tela_piloto from "../../assets/tela_piloto.png";
import tela_corridas from "../../assets/tela_corridas.png";
import tela_corridas_ao_vivo_part_1 from "../../assets/tela_corridas_ao_vivo_part_1.png";
import tela_corridas_ao_vivo_part_2 from "../../assets/tela_corridas_ao_vivo_part_2.png";
import tela_chute_sorte_part_1 from "../../assets/tela_chute_sorte_part_1.png";
import tela_chute_sorte_part_2 from "../../assets/tela_chute_sorte_part_2.png";
import tela_marktplace from "../../assets/tela_marktplace.png";
import tela_marktplace_part_2 from "../../assets/tela_marktplace_part_2.png";
import tela_quiz from "../../assets/tela_quiz.png";
import tela_ranking from "../../assets/tela_ranking.png";
import carro1 from "../../assets/carro1.png";
import carro2 from "../../assets/carro2.png";
import carro3 from "../../assets/carro3.png";
import {
  FaGlobe,
  FaNetworkWired,
  FaBullseye,
  FaChartBar,
  FaHome,
} from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import {
  GiFullMotorcycleHelmet,
  GiRaceCar,
  GiMoneyStack,
} from "react-icons/gi";
import { SiLivechat } from "react-icons/si";
import { MdCasino, MdOutlineQuiz } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
const images = [carro1, carro2, carro3];
export default function LandingPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <NavMobile className={styles.navbar}></NavMobile>
      <div className={styles.start}>
        <div className={styles.overlay}></div>
        <img
          src={images[currentImage]}
          alt="Formula E"
          className={styles.image}
        />
        <div className={styles.textContainer}>
          <h3>
            Formula E <br /> <span>LiveHub</span>
          </h3>
          <a href="/#desafio">
            <button className={styles.button}>Explore</button>
          </a>
        </div>
      </div>
      <div id="desafio" className={styles.container}>
        <h1 className={styles.title}>
          O Grande Desafio da Fórmula E: A Falta de Visibilidade
        </h1>
        <div className={styles.sections}>
          <div className={styles.section}>
            <div className={styles.icon}>
              <FaGlobe />
            </div>
            <h2 className={styles.subtitle}>Fórmula E: Inovação e Desafio</h2>
            <p className={styles.text}>
              A Fórmula E tem se destacado como uma competição de carros
              elétricos, promovendo sustentabilidade e inovação. No entanto,
              enfrenta o desafio da falta de visibilidade, o que limita seu
              alcance e reconhecimento.
            </p>
          </div>
          <div className={styles.section}>
            <div className={styles.icon}>
              <FaNetworkWired />
            </div>
            <h2 className={styles.subtitle}>Estratégias de Marketing</h2>
            <p className={styles.text}>
              A Fórmula E precisa delver em estratégias de marketing mais
              eficazes. Campanhas direcionadas e parcerias com influenciadores
              poderiam aumentar sua visibilidade e atrair novos fãs.
            </p>
          </div>
          <div className={styles.section}>
            <div className={styles.icon}>
              <FaBullseye />
            </div>
            <h2 className={styles.subtitle}>Desafios de Audiência</h2>
            <p className={styles.text}>
              Apesar de suas corridas emocionantes, a Fórmula E luta para atrair
              grandes audiências. A falta de cobertura midiática em comparação
              com outras categorias automotivas é um fator crucial nesse
              desafio.
            </p>
          </div>
          <div className={styles.section}>
            <div className={styles.icon}>
              <FaChartBar />
            </div>
            <h2 className={styles.subtitle}>Futuro da Fórmula E</h2>
            <p className={styles.text}>
              Para garantir seu futuro, a Fórmula E deve encontrar formas de
              aumentar sua presença. O sucesso a longo prazo depende de
              estratégias eficazes que tornem a categoria uma das mais
              reconhecidas no automobilismo.
            </p>
          </div>
        </div>
      </div>
      <div id="solucao" className={styles.solucaoContainer}>
        <h1 className={styles.solucaoTitle}>
          Solução para a visibilidade da Formula E
        </h1>
        <div className={styles.solucaoSections}>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <FaHome />
            </div>
            <h2 className={styles.solucaoSubtitle}>Tela Home</h2>
            <p className={styles.solucaoText}>
              Nesta tela inicial, apresentamos uma seleção das equipes da
              Fórmula E e informações sobre algumas corridas, destacando a
              emoção e a inovação dessa competição de carros elétricos.
            </p>
            <img src={tela_home} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <RiTeamLine />
            </div>
            <h2 className={styles.solucaoSubtitle}>Tela de equipes</h2>
            <p className={styles.solucaoText}>
              Apresentamos as equipes da Fórmula E, com detalhes sobre o número
              de vitórias, pódios, corridas e os nomes dos dois pilotos de cada
              equipe. Essas informações ressaltam a competitividade e a emoção
              da categoria.
            </p>
            <img src={tela_equipe} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <GiFullMotorcycleHelmet />
            </div>
            <h2 className={styles.solucaoSubtitle}>Tela de Pilotos</h2>
            <p className={styles.solucaoText}>
              A tela de pilotos mostra dados em tempo real, como velocidade,
              temperatura, luminosidade e umidade, oferecendo uma visão
              detalhada do desempenho nas corridas.
            </p>
            <img src={tela_piloto} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <GiRaceCar />
            </div>
            <h2 className={styles.solucaoSubtitle}>Tela de corridas</h2>
            <p className={styles.solucaoText}>
              A Fórmula E precisa aumentar sua presença, destacando todas as
              corridas do campeonato. O sucesso a longo prazo depende de
              estratégias eficazes que tornem a categoria uma das mais
              reconhecidas no automobilismo.
            </p>

            <img src={tela_corridas} alt="" />
          </div>
        </div>
        <div className={styles.solucaoSections}>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <SiLivechat />
            </div>
            <h2 className={styles.solucaoSubtitle}>Corridas ao vivo 1</h2>
            <p className={styles.solucaoText}>
              A Fórmula E se destaca como uma competição de carros elétricos,
              promovendo sustentabilidade e inovação. Para aumentar a
              visibilidade, oferecemos corridas ao vivo com vídeos e chat
              interativo durante os eventos.
            </p>

            <img src={tela_corridas_ao_vivo_part_1} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <SiLivechat />
            </div>
            <h2 className={styles.solucaoSubtitle}>Corridas ao vivo 2</h2>
            <p className={styles.solucaoText}>
              A Fórmula E precisa delver em estratégias de marketing mais
              eficazes. Na tela de corrida 2, será possível selecionar pontos da
              pista para visualizar temperatura, umidade e luminosidade, além de
              uma tabela em tempo real com a colocação dos pilotos.
            </p>

            <img src={tela_corridas_ao_vivo_part_2} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <MdCasino />
            </div>
            <h2 className={styles.solucaoSubtitle}>Chute da sorte 1</h2>
            <p className={styles.solucaoText}>
              Apesar das corridas emocionantes, a Fórmula E luta para atrair
              grandes audiências. Na tela de chute da sorte 1, os usuários
              poderão escolher em qual corrida do campeonato desejam apostar,
              incentivando a interação.
            </p>

            <img src={tela_chute_sorte_part_1} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <MdCasino />
            </div>
            <h2 className={styles.solucaoSubtitle}>Chute da sorte 2</h2>
            <p className={styles.solucaoText}>
              A Fórmula E precisa expandir sua presença. Na tela de chute 2, os
              usuários poderão selecionar a posição dos pilotos e salvar suas
              escolhas para realizar apostas de forma fácil.
            </p>

            <img src={tela_chute_sorte_part_2} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <GiMoneyStack />
            </div>
            <h2 className={styles.solucaoSubtitle}>Martkplace</h2>
            <p className={styles.solucaoText}>
              É fundamental que a Fórmula E amplie sua presença. No marketplace,
              os usuários poderão trocar seus pontos ganhos por produtos reais
              da nossa loja, incentivando o engajamento.
            </p>

            <img src={tela_marktplace} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <GiMoneyStack />
            </div>
            <h2 className={styles.solucaoSubtitle}>Martkplace 2</h2>
            <p className={styles.solucaoText}>
              Após acessar nosso marketplace você poderá acessar à parte dos produtos
            </p>

            <img src={tela_marktplace_part_2} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <MdOutlineQuiz />
            </div>
            <h2 className={styles.solucaoSubtitle}>Quiz</h2>
            <p className={styles.solucaoText}>
              Para garantir seu futuro, a Fórmula E deve aumentar sua presença.
              O quiz de 10 perguntas permitirá que os usuários ganhem pontos,
              promovendo o aprendizado e o engajamento com a categoria.
            </p>

            <img src={tela_quiz} alt="" />
          </div>
          <div className={styles.solucaoSection}>
            <div className={styles.solucaoIcon}>
              <FaRankingStar />
            </div>
            <h2 className={styles.solucaoSubtitle}>Ranking</h2>
            <p className={styles.solucaoText}>
              Aumentar a presença da Fórmula E é essencial. A tela de ranking
              mostrará os usuários com mais pontos, com os três primeiros
              recebendo um destaque especial para incentivar a competição.
            </p>

            <img src={tela_ranking} alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
