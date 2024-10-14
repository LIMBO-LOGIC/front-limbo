import LoadingOverlay from "react-loading-overlay-ts";
import { Outlet } from "react-router-dom";
import useContexts from "../hooks/useContext";
import AdminNav from "../components/AdminNav";
import AdminNavMobile from "../components/AdminNavMobile";
import AdminHeader from "../components/AdminHeader";

export default function AdminLayout() {
  const { isMobileBig, isLoadingAdmin } = useContexts();

  return (
    <LoadingOverlay
      active={isLoadingAdmin}
      spinner
      text="Carregando..."
      wrapperStyle={{ height: "100vh" }} // Estilo aplicado corretamente
      styles={{
        content: (base) => ({ ...base }), // Mantém os estilos padrão
      }}
    >
      <div className="containerRace containerRaceADM">
        {isMobileBig ? <AdminNavMobile /> : <AdminNav />}
        <main>
          {isMobileBig ? "" : <AdminHeader />}
          <Outlet />
        </main>
      </div>
    </LoadingOverlay>
  );
}
