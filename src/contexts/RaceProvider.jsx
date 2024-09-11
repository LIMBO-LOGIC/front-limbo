import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";

export const RaceContext = createContext({});

RaceProvider.propTypes = {
  children: PropTypes.node,
};

export default function RaceProvider({ children }) {
  const [isMobileBig, setIsMobileBig] = useState(window.innerWidth <= 768);
  const [isMobileSmall, setIsMobileSmall] = useState(window.innerWidth <= 640);

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
  };

  return <RaceContext.Provider value={dataRace}>{children}</RaceContext.Provider>;
}
