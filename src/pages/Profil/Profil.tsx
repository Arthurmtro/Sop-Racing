// import CardShop from "../../components/CardShop";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../../constants/context/globalState.context";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import TabShop from "../../components/TabShop/TabShop";
import Container from "@mui/material/Container";
import { defineWeights } from "../../utils/defineWeights";

const Profil = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const { inventory } = state;

  const [exploded, setExploded] = useState(false);

  const equipedItems = inventory?.items
    .filter((i) => i.isEquipped)
    .map((i) => i.item);

  const CalculateTotal = () => {
    const totalStats: any[] = [];

    equipedItems?.map((equipItem) => {
      equipItem?.statistiques?.map((stat) => {
        const index = totalStats.findIndex((i) => i.name === stat.type);
        if (index === -1) {
          totalStats.push({ name: stat.type, value: stat.value });
        } else {
          totalStats[index].value += stat.value;
        }
      });
    });

    return totalStats;
  };

  if (!state.loaded) return null;

  return (
    <>
      <Typography variant="body1">Stop this mobile</Typography>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src="/assets/items/kits/chassis.png"
            alt=""
            style={{
              width: "15rem",
              height: "15rem",
              position: "absolute",
              top: "10rem",
              left: "10rem",
              zIndex: "5",
              opacity: exploded ? 1 : 0,
              transition: "opacity 200ms ease-in",
            }}
            onMouseOver={() => setExploded(true)}
            onMouseOut={() => setExploded(false)}
          />
          <img
            src={`${
              equipedItems?.find((i) => i.type === "Bodywork")?.image
            }.png`}
            alt=""
            style={
              exploded
                ? {
                    width: "18rem",
                    height: "18rem",
                    position: "absolute",
                    top: "6rem",
                    left: "25rem",
                    zIndex: "5",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "18rem",
                    height: "18rem",
                    position: "absolute",
                    top: "8rem",
                    left: "9.8rem",
                    zIndex: "5",
                    transition: "all 0.5s ease-in-out",
                  }
            }
            onMouseOver={() => setExploded(true)}
            onMouseOut={() => setExploded(false)}
          />
          <img
            src={`${equipedItems?.find((i) => i.type === "Wheels")?.image}.png`}
            alt=""
            style={
              exploded
                ? {
                    width: "8rem",
                    height: "8rem",
                    position: "absolute",
                    top: "23rem",
                    left: "28.5rem",
                    transform: "rotate(250deg)",
                    zIndex: "2",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "8rem",
                    height: "8rem",
                    position: "absolute",
                    top: "16.55rem",
                    left: "14.5rem",
                    transform: "rotate(250deg)",
                    zIndex: "2",
                    transition: "all 0.5s ease-in-out",
                  }
            }
          />
          <img
            src={`${equipedItems?.find((i) => i.type === "Wheels")?.image}.png`}
            alt=""
            style={
              exploded
                ? {
                    width: "8rem",
                    height: "8rem",
                    position: "absolute",
                    top: "23rem",
                    left: "28.5rem",
                    transform: "rotate(250deg)",
                    zIndex: "2",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "8rem",
                    height: "8rem",
                    position: "absolute",
                    top: "13.2rem",
                    left: "20.2rem",
                    transform: "rotate(250deg)",
                    zIndex: "2",
                    transition: "all 0.5s ease-in-out",
                  }
            }
          />
          <img
            src={`${equipedItems?.find((i) => i.type === "Motor")?.image}.png`}
            alt="motor"
            style={
              exploded
                ? {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "23rem",
                    left: "3rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "16rem",
                    left: "15rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
            }
          />
          <img
            src={`${
              equipedItems?.find((i) => i.type === "Spoiler")?.image
            }.png`}
            alt="motor"
            style={
              exploded
                ? {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "8rem",
                    left: "4rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "10rem",
                    left: "19rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
            }
          />
          <img
            src={`${equipedItems?.find((i) => i.type === "Brakes")?.image}.png`}
            alt="brakes"
            style={
              exploded
                ? {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "6rem",
                    left: "19rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
                : {
                    width: "5rem",
                    height: "5rem",
                    position: "absolute",
                    top: "12rem",
                    left: "19rem",
                    zIndex: "1",
                    transition: "all 0.5s ease-in-out",
                  }
            }
          />
        </div>

        <Card>
          <CardContent>
            <Typography variant="h5" marginBottom={1}>
              Statistiques de la Voiture
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {CalculateTotal()?.map((i) => (
                <Box>
                  <Typography key={i.name} variant="body1">
                    {i.name} : <b>{i.value}</b>
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(i.value * 100) / 60}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Typography variant="h4">Inventaire</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Icon</TableCell>
            <TableCell>Rarety</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Power</TableCell>
            <TableCell>Acceleration</TableCell>
            <TableCell>Grip</TableCell>
            <TableCell>Handling ability</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Wear</TableCell>
            <TableCell>Energy consumption</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>$Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory?.items
            ?.sort((a, b) => {
              if (a.item.type > b.item.type) return -1;
              if (a.item.type < b.item.type) return 1;
              return 0;
            })
            .map((i) => (
              <TabShop
                key={i.item.id}
                item={i.item}
                solde={state.personal_team?.coin}
                dispatch={dispatch}
                isEquiped={
                  equipedItems?.find((e) => e.id === i.item.id) ? true : false
                }
              />
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Profil;
