import LoadingOverlay from "react-loading-overlay-ts";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Nav from "../components/Nav";
import NavMobile from "../components/NavMobile";
import useContexts from "../hooks/useContext";

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