import * as TYPES from "../types/state";

export class Voiture {
  public statistiques: TYPES.IEVehicle;

  constructor(inventory: TYPES.IETeamInventory) {
    this.statistiques = {
      acceleration: 0,
      energyConsumption: 0,
      grip: 0,
      handlingAbility: 0,
      power: 0,
      wear: 0,
      weight: 0,
    };
    inventory.items.forEach((item) => {
      if (item.isEquipped) {
        for (let i = 0; i < item.item.statistiques.length; i++) {
          const stat = item.item.statistiques[i];
          switch (stat.type) {
            case "Acceleration":
              this.statistiques.acceleration += stat.value;
              break;
            case "Energy consumption":
              this.statistiques.energyConsumption += stat.value;
              break;
            case "Grip":
              this.statistiques.grip += stat.value;
              break;
            case "Handling ability":
              this.statistiques.handlingAbility += stat.value;
              break;
            case "Power":
              this.statistiques.power += stat.value;
              break;
            case "Wear":
              this.statistiques.wear += stat.value;
              break;
            case "Weight":
              this.statistiques.weight += stat.value;
              break;
          }
        }
      }
    });
  }

  calculerVitesse(): number {
    return (
      (this.statistiques.power * this.statistiques.acceleration) /
      this.statistiques.weight
    );
  }

  calculerAdherence(): number {
    return this.statistiques.grip * this.statistiques.handlingAbility;
  }
}

export class Course {
  laps: number;
  sections: TYPES.IESection[];

  constructor(data: TYPES.IERace) {
    this.laps = data.laps;
    this.sections = data.sections;
  }

  calculerTempsSection(voiture: Voiture, section: TYPES.IESection): number {
    if (section.type === "Straight") {
      return 1000 / voiture.calculerVitesse();
    } else if (section.type === "Turn") {
      return 1000 / voiture.calculerAdherence();
    }
    return 0;
  }

  simulerCourse(voiture: Voiture): number {
    let totalTime = 0;
    for (let i = 0; i < this.laps; i++) {
      this.sections.forEach((section) => {
        totalTime += this.calculerTempsSection(voiture, section);
      });
    }
    return totalTime;
  }
}
