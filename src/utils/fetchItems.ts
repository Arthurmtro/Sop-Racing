import TOKEN from "../constants/token";
import { IEItem } from "../types/state";

export const fetchItems = async (itemId?: string) => {
  const body = {
    availableOnly: false,
    types: ["Wheels", "Motor", "Brakes", "Bodywork", "Spoiler"],
  };

  const data = await fetch("http://185.98.136.60:9090/items/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN.access_token}`,
    },
    body: JSON.stringify(body),
  });

  return (await data.json()) as IEItem[];
};
