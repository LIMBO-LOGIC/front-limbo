import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import RaceProvider from "./contexts/RaceProvider";

function App() {
  return (
    <RaceProvider>
      <RouterProvider router={router} />
    </RaceProvider>
  );
}

export default App;
