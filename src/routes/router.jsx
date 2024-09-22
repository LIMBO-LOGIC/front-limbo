import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RootLayout from "../layouts/RootLayout";
import RaceLayout from "../layouts/RaceLayout";
import Home from "../pages/Home";
import Teams from "./../pages/Teams/index";
import Races from "../pages/Races";
import Marketplace from "../pages/Marketplace";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import LiveRace from "../pages/LiveRace";
import Ranking from "../pages/Ranking";
import Product from "../pages/Product";
import Pilot from "../pages/Pilot";
import LuckyKick from "../pages/LuckyKick";
import ChoiceLucky from "../pages/ChoiceLucky";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
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
        path: "product",
        element: <Product />,
      },
      {
        path: "pilot",
        element: <Pilot />,
      },
      {
        path: "luck-kick",
        element: <LuckyKick />,
      },
      {
        path: "luck-kick/choice/:idRace",
        element: <ChoiceLucky />,
      },
    ],
  },
]);

export default router;
