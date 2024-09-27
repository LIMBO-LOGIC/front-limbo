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
  // {
  //   path: "/admin",
  //   element: <AdminLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Login />,
  //     },
  //   ],
  // },
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
        path: "pilot/:id",
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
