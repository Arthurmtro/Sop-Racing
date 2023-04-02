import TOKEN from "../constants/token";
import { IETeam } from "../types/state";

export const fetchTeams = async (teamId?: string) => {
  const data = await fetch(`http://185.98.136.60:9090/teams/${teamId ?? ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN.access_token}`,
    },
  });

  return (await data.json()) as IETeam[];
};
