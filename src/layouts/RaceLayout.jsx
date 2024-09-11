import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
import useContexts from "../hooks/useContext";
import NavMobile from "../components/NavMobile";

export default function RaceLayout() {
  const { isMobileBig } = useContexts()

  return (
    <div className="containerRace">
      {isMobileBig ? <NavMobile /> : <Nav />}
      <main>
        {isMobileBig ? '': <Header />}
        <Outlet />
      </main>
    </div>
  );
}
