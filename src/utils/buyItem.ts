import TOKEN from "../constants/token";

const buyItem = async (itemId?: number) => {
  if (!itemId) {
    return;
  }

  const req = await fetch(`http://185.98.136.60:9090/items/buy/${itemId}/18`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN.access_token}`,
    },
  });

  const res = await req.json();
};

export default buyItem;
