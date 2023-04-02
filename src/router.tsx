import { createBrowserRouter } from "react-router-dom";
import Shop from "./pages/Shop";
import Profil from "./pages/Profil";
import App from "./App";
import Races from "./pages/Races/Races";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Profil />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/races",
        element: <Races />,
      },
    ],
  },
]);

export default router;
