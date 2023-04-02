import { useContext } from "react";
import { GlobalStateContext } from "../../constants/context/globalState.context";
import {
  Card,
  Grid,
  Typography,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import { defineWeights } from "../../utils/defineWeights";
import { VOITURE_1, VOITURE_2 } from "../../constants/customItems";

const legacy = true;

const Races = () => {
  const {
    state: { races, inventory },
  } = useContext(GlobalStateContext);

  if (!races) {
    return <div>loading ...</div>;
  }
  console.log(races);

  const equipedItems = inventory?.items
    .filter((i) => i.isEquipped)
    .map((i) => i.item);

  let vWeight: number;

  if (legacy) {
    vWeight =
      equipedItems?.reduce((acc, item) => {
        return acc + defineWeights(item.statistiques ?? []) / 500;
      }, 0) ?? 0;
  } else {
    vWeight = defineWeights(VOITURE_1) / 100;
  }

  return (
    <>
      <Typography variant="h6">*TRT: Theoretical resolution time</Typography>
      <Grid container spacing={2}>
        {races.map((race) => (
          <Grid item xs={6}>
            <Card>
              <CardHeader
                title={<Typography variant="h5">{race.name}</Typography>}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-around">
                  <img
                    src={
                      "/assets/races/" +
                      race.name.toLowerCase().replace(" ", "_") +
                      ".svg"
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "/assets/races/daytona.svg";
                    }}
                  />
                  <Typography>
                    TRT:{" "}
                    <b>
                      {Math.floor(
                        vWeight *
                          race.laps *
                          race.sections?.reduce((acc, section) => {
                            switch (section.type) {
                              case "Straight":
                                return acc + 15;
                              case "Turn":
                                return acc + 30;
                              case "Sharp turn":
                                return acc + 50;
                              case "Uphill":
                                return acc + 35;
                              case "Downhill":
                                return acc + 10;
                              default:
                                return acc;
                            }
                          }, 0)
                      ) / 3600}{" "}
                    </b>
                    H
                  </Typography>

                  {}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Races;
