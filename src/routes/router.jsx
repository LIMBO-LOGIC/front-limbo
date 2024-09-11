import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import RootLayout from "../layouts/RootLayout";
import RaceLayout from "../layouts/RaceLayout";
import Home from "../pages/Home";

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
    ],
  },
]);

export default router;
