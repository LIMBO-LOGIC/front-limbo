import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import RaceProvider from "./contexts/RaceProvider";

function App() {
  let teste = {
    name: 'ABT CUPRA Formula E Team ',
    colorMain: '#194997',
    wins: 14,
    podiums: 47,
    races: 115,
    pilotos: [ // sempre 2 pilotos
      {
        numero: 11,
        name: 'Lucas',
        lastName: 'Di Grassi'
      },
      {
        numero: 11,
        name: 'Lucas',
        lastName: 'Di Grassi'
      },
    ]
  }

  return (
    <RaceProvider>
      <RouterProvider router={router} />
    </RaceProvider>
  );
}

export default App;
