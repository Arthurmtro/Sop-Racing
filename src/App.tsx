import { useContext, useEffect, useState } from "react";
import {
  GlobalStateActionKind,
  GlobalStateContext,
} from "./constants/context/globalState.context";

import { fetchItems } from "./utils/fetchItems";
import { fetchTeams } from "./utils/fetchTeams";
import { fetchRaces } from "./utils/fetchRace";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { fetchInventory } from "./utils/fetchInventory";

let timeout: number;

export default function App() {
  const [nbrNewNbrItems, setNbrNewNbrItems] = useState(0);
  const [nbrItems, setNbrItems] = useState(0);
  const { dispatch } = useContext(GlobalStateContext);

  const initApp = async () => {
    try {
      const items = await fetchItems();
      const teams = await fetchTeams();
      const races = await fetchRaces();
      const inventory = await fetchInventory();

      dispatch({
        type: GlobalStateActionKind.INIT_STATE,
        payload: {
          items,
          races,
          teams,
          inventory,
          personal_team: teams.find((team) => team.id === 18),
        },
      });

      setNbrNewNbrItems(items.length);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: GlobalStateActionKind.END_LOADED, payload: true });
    }
  };

  useEffect(() => {
    timeout = setInterval(() => {
      initApp();
    }, 10000);

    return () => {
      clearInterval(timeout);
    };
  }, []);

  useEffect(() => {
    console.log("nbrNewNbrItems", nbrNewNbrItems);
    console.log("nbrItems", nbrItems);

    if (nbrItems === 0) {
      setNbrItems(nbrNewNbrItems);
      return;
    }

    if (nbrNewNbrItems > nbrItems) {
      alert(`new item !! id: ${nbrNewNbrItems}`);
      setNbrItems(nbrNewNbrItems);
    } else {
      setNbrItems(nbrNewNbrItems);
    }
  }, [nbrNewNbrItems]);

  return (
    <>
      <Navbar />
      {/* <Container> */}
      <Outlet />
      {/* </Container> */}
    </>
  );
}
function buyItem(id: number) {
  throw new Error("Function not implemented.");
}
