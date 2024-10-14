import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";
import useContexts from "../hooks/useContext";
import NavMobile from "../components/NavMobile";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay-ts";

export default function RaceLayout() {
  const navigate = useNavigate();
  const { isMobileBig, dataUser, isLoading } = useContexts();

  useEffect(() => {
    if (dataUser == undefined) {
      toast.error("Realize o login novamente!");
      navigate("/login");
    }
  }, [dataUser, navigate]);

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Carregando..."
      wrapperStyle={{ height: "100vh", zIndex: '1000' }} // Estilo aplicado corretamente
      styles={{
        content: (base) => ({ ...base }), // Mantém os estilos padrão
      }}
    >
      <div className="containerRace">
        {isMobileBig ? <NavMobile /> : <Nav />}
        <main>
          {isMobileBig ? "" : <Header />}
          <Outlet />
          <Footer />
        </main>
      </div>
    </LoadingOverlay>
  );
}
