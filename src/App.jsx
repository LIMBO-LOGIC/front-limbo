import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import RaceProvider from "./contexts/RaceProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <RaceProvider>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </RaceProvider>
  );
}

export default App;
