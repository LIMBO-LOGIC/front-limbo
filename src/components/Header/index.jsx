import React from "react";
import styled from "styled-components";
import leftImg from "../../assets/image4.png"; // Mapa
import rightImg from "../../assets/image.png"; // Corrida
import brasil from "../../assets/bandeira_brasil.png";

const HeaderStyled = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
`;

const LeftSection = styled.div`
  position: relative;
`;

const RightSection = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espaço entre os elementos de texto */
`;

const Flag = styled.img`
  width: 40px; /* Ajuste o tamanho da bandeira conforme necessário */
`;

const Location = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

const Round = styled.p`
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 18px;
  color: white;
`;

export default function Header() {
  return (
    <HeaderStyled>
      <LeftSection>
        <Image src={leftImg} alt="Imagem à esquerda" />
        <TextOverlay>
          <Flag src={brasil} alt="Bandeira do Brasil" />
          <Location>São Paulo</Location>
          <p className="corrida">Próxima Corrida:</p>
        </TextOverlay>
      </LeftSection>
      <RightSection>
        <Image src={rightImg} alt="Imagem à direita" />
        <Round>ROUND 1</Round>
      </RightSection>
    </HeaderStyled>
  );
}
