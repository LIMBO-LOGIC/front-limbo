import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";

export const RaceContext = createContext({});

RaceProvider.propTypes = {
  children: PropTypes.node,
};

export default function RaceProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileBig, setIsMobileBig] = useState(window.innerWidth <= 768);
  const [isMobileSmall, setIsMobileSmall] = useState(window.innerWidth <= 640);
  const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem('userStorage')))

  useEffect(() => {
    const handleResize = () => {
      setIsMobileBig(window.innerWidth <= 768);
      setIsMobileSmall(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dataRace = {
    isMobileBig,
    isMobileSmall,
    dataUser, setDataUser,
    isLoading, setIsLoading
  };

  return <RaceContext.Provider value={dataRace}>{children}</RaceContext.Provider>;
}
