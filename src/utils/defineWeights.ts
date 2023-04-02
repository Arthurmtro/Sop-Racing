import { IEItem } from "../types/state";

export const defineWeights = (item: IEItem) => {
  return (
    item?.statistiques?.reduce((acc, stat) => {
      console.log("stat.type", stat.type);
      switch (stat.type) {
        case "Power":
          return acc + (1 - stat.value / 60) * 100;
        case "Acceleration":
          return acc + (1 - stat.value / 60) * 100;
        case "Grip":
          return acc + (1 - stat.value / 60) * 100;
        case "Handling Ability":
          return acc + (1 - stat.value / 60) * 100;
        case "Weight":
          return acc + stat.value;
        case "Wear":
          return acc + stat.value;
        case "Energy Consumption":
          return acc + (stat.value / 60) * 100;

        default:
          return acc;
      }
    }, 0) ?? 0
  );
};
