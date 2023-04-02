import TOKEN from "../constants/token";

const equipItem = async (itemId?: number) => {
  if (!itemId) {
    return;
  }

  const req = await fetch(
    `http://185.98.136.60:9090/teams/18/inventory/equip/${itemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN.access_token}`,
      },
    }
  );

  const res = await req.json();

  if (res.code === "NOPE") {
    throw res.message;
  }
};

export default equipItem;
