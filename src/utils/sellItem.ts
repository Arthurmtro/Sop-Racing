import TOKEN from "../constants/token";

const sellItem = async (itemId?: number, source?: string, price?: number) => {
  if (!itemId) {
    return;
  }

  await fetch(
    `http://185.98.136.60:9090/items/sell/18/${source ?? "marketplace"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN.access_token}`,
      },
      body: JSON.stringify({
        itemId: itemId,
        price: price ?? Infinity,
      }),
    }
  );
};

export default sellItem;
