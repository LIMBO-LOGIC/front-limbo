import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RootLayout from "../layouts/RootLayout";
import RaceLayout from "../layouts/RaceLayout";
import Home from "../pages/Home";
import Teams from './../pages/Teams/index';
import Races from "../pages/Races";
import Marketplace from "../pages/Marketplace";
import Profile from "../pages/Profile";

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
    ],
  },
]);

export default router;
