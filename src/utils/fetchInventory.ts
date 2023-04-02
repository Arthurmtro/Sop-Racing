import TOKEN from "../constants/token";
import { IEInventory } from "../types/state";

export const fetchInventory = async () => {
  const data = await fetch("http://185.98.136.60:9090/teams/18/inventory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN.access_token}`,
    },
  });

  return (await data.json()) as IEInventory[];
};
