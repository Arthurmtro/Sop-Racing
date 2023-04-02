export interface IEGlobalState {
  personal_team?: IETeam;
  team?: [IETeam];
  inventory?: IETeamInventory;
  items?: [IEItem];
  transaction?: [IETransaction];
  races?: [IERace];
  loaded?: boolean;
}

export interface IETeam {
  id: number;
  name: string;
  image: string;
  score: number;
  coin: number;
  actualRace: number;
  vehicle: IEVehicle;
}

export interface IEVehicle {
  acceleration: number;
  energyConsumption: number;
  grip: number;
  handlingAbility: number;
  power: number;
  wear: number;
  weight: number;
}

// export interface IERace {}

export interface IETransactionRequest {
  itemId: number;
  teamSellerId: number;
  price: number;
  status: string;
  completionDate: Date;
  openingDate: Date;
}

export interface IEItem {
  id: number;
  name: string;
  type: "Wheels" | "Motor" | "Brakes" | "Bodywork" | "Spoiler";
  sellingPrice: number;
  image: string;
  rarity: string;
  buyed?: boolean;
  statistiques?: IEItemStatistique[];
  status: string;
  seller: string;
}

export interface IEItemStatistiqueValues {
  Power: number;
  Acceleration: number;
  Grip: number;
  HandlingAbility: number;
  Weight: number;
  EnergyConsumption: number;
  Wear: number;
}

export interface IEItemStatistique {
  type:
    | "Power"
    | "Acceleration"
    | "Grip"
    | "Handling Ability"
    | "Weight"
    | "Energy Consumption"
    | "Wear";
  value: number;
}

export interface IETransactionReponse {
  price: number;
  status: string;
  creationDate: Date;
  completionDate: Date;
  openingDate: Date;
  item: IEItem;
  teamSeller: IETeam;
  teamBuyer: IETeam;
  id: number;
}

export interface IEMedal {
  type: string;
  timeToObtain: number;
  rewardCoins: number;
  rewardPoints: number;
}

export interface IERace {
  id: number;
  dateAvailability: string;
  name: string;
  laps: number;
  difficulty: number;
  image: string;
  optional: boolean;
  nextRace: number | null;
  previousRace: number | null;
  sections: IESection[];
  medals: IEMedal[];
}

export interface IESection {
  type: "Straight" | "Turn" | "Uphill" | "Downhill" | "Sharp turn";
  terrain: string;
}

export interface IEItemCreateRequest {
  id: number;
  name: string;
  type: string;
  sellingPrice: number;
  image: string;
  rarity: string;
  statistiques: [IEItemStatistique];
  openingDate: Date;
  status: string;
  completionDate: Date;
}

export interface IEItemCreateResponse {
  id: number;
  name: string;
  type: string;
  sellingPrice: number;
  image: string;
  rarity: string;
  statistiques: [IEItemStatistique];
  transactionId: number;
}
export interface IEItemSellRequest {
  itemId: number;
  price: number;
}

export interface IEItemSearchRequest {
  availableOnly: boolean;
  types: [string];
  source: string;
}

export interface IEItemSearchResponse {
  id: number;
  name: string;
  type: string;
  sellingPrice: number;
  image: string;
  rarity: string;
  statistiques: [IEItemStatistique];
  transactionId: number;
  status: string;
  seller: string;
}

export interface IETransaction {
  price: number;
  status: string;
  creationDate: Date;
  completionDate: Date;
  openingDate: Date;
  item: IEItem;
  teamSeller: IETeam;
  teamBuyer: IETeam;
}

export interface IEInventory {
  item: IEItem;
  isEquipped: boolean;
}
export interface IETeamInventory {
  items: [IEInventory];
}

export interface IERunResult {
  time: number;
  date: Date;
  medal: string;
  team: IETeam;
  race: IERace;
  rank: number;
  wearByLaps: number;
  consumptionByLaps: number;
  stats: IEVehicle;
}
