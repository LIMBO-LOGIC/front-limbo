import { createBrowserRouter } from "react-router-dom";
import RaceLayout from "../layouts/RaceLayout";
import RootLayout from "../layouts/RootLayout";
import ChoiceLucky from "../pages/ChoiceLucky";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import LiveRace from "../pages/LiveRace";
import Login from "../pages/Login";
import LuckyKick from "../pages/LuckyKick";
import Marketplace from "../pages/Marketplace";
import NotFound from "../pages/NotFound";
import Pilot from "../pages/Pilot";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import Quiz from "../pages/Quiz";
import Races from "../pages/Races";
import Ranking from "../pages/Ranking";
import Register from "../pages/Register";
import Teams from "./../pages/Teams/index";
import Favorite from "../pages/Favorite";
import AdminLayout from "../layouts/AdminLayout";
import AllProduct from "../pages/AdminProducts";
import CreateProduct from "../pages/AdminCreateProducts";
import ProductList from "../pages/AdminProductList";
import UptadeProduct from "../pages/AdminUptadeProduct";
import CreateRace from "../pages/AdminCreateRace";
import CreateRaceAll from "../pages/AdminRace";
import ListaRace from "../pages/AdminRaceList";
import UptadeRace from "../pages/AdminUptadeRace";
import AdminHome from "../pages/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "*",
        element: <NotFound route={"/"} />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "allProduct",
        element: <AllProduct />,
      },
      {
        path: "createProduct",
        element: <CreateProduct />,
      },
      {
        path: "productList",
        element: <ProductList />,
      },
      {
        path: "uptadeProduct/:id",
        element: <UptadeProduct />,
      },
      {
        path: "allCreateRace",
        element: <CreateRaceAll />,
      },
      {
        path: "createRace",
        element: <CreateRace />,
      },
      {
        path: "raceList",
        element: <ListaRace />,
      },
      {
        path: "uptadeRace/:id",
        element: <UptadeRace />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/race",
    element: <RaceLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teams",
        element: <Teams />,
      },
      {
        path: "races",
        element: <Races />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "live-race",
        element: <LiveRace />,
      },
      {
        path: "quiz",
        element: <Quiz />,
      },
      {
        path: "ranking",
        element: <Ranking />,
      },
      {
        path: "product/:id", // Updated route for product details
        element: <Product />,
      },
      {
        path: "pilot/:id",
        element: <Pilot />,
      },
      {
        path: "luck-kick",
        element: <LuckyKick />,
      },
      {
        path: "luck-kick/choice/:idRace/:idRacingBet",
        element: <ChoiceLucky />,
      },
      {
        path: "favorites",
        element: <Favorite />,
      },
      {
        path: "*",
        element: <NotFound route={"/race"} />,
      },
    ],
  },
]);

export default router;
