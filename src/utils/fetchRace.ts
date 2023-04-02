import TOKEN from "../constants/token";
import { IERace } from "../types/state";

export const fetchRaces = async () => {
  const data = await fetch("http://185.98.136.60:9090/races/all/18", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN.access_token}`,
    },
  });

  return (await data.json()) as IERace[];
};
