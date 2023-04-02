import { Card, CardContent, Button, Typography } from "@mui/material";
import { IEItem } from "../../types/state";
import buyItem from "../../utils/buyItem";

interface IECompareCard {
  item?: IEItem;
  current?: IEItem;
  newCoins?: number;
}

const CompareCard = (props: IECompareCard) => {
  const handleBuy = async () => {
    await buyItem(props.item?.id);

    // window.location.reload();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <h1>Before</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "15rem",
        }}
      >
        <Card
          sx={{ maxWidth: 500 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>After</h2>
            <h3 style={{ margin: 0 }}>{props.item?.name}</h3>
            <h5 style={{ margin: 0 }}>({props.item?.rarity})</h5>
            <img
              src={`${props.item?.image.replace("../../..", "")}.png`}
              alt=""
              width={100}
            />
          </CardContent>
          <CardContent>
            {props.item?.statistiques?.map((stat, index) => {
              return (
                <div key={index} style={{ width: "10rem" }}>
                  <h5 style={{ margin: 0 }}>
                    {stat.type} : {stat.value}
                  </h5>
                  <div
                    style={{
                      width: "10rem",
                      height: "0.25rem",
                      backgroundColor: "#A7CAED",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: (stat.value * 100) / 20 + "%",
                        height: "0.25rem",
                        backgroundColor: "#1976D2",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card
          sx={{ maxWidth: 500 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2>Actuel</h2>
            <h3 style={{ margin: 0 }}>{props.current?.name}</h3>
            <h5 style={{ margin: 0 }}>({props.current?.rarity})</h5>
            <img
              src={`${props.current?.image.replace("../../..", "")}.png`}
              alt=""
              width={100}
            />
          </CardContent>
          <CardContent>
            {props.current?.statistiques?.map((stat, index) => {
              const currentVal = stat.value;
              const newVal =
                props.item?.statistiques?.find((s) => s.type === stat.type)
                  ?.value ?? 0;

              const currStyle = {
                width:
                  newVal < currentVal
                    ? (newVal * 100) / 20 + "%"
                    : (currentVal * 100) / 20 + "%",
                height: "0.25rem",
                backgroundColor: "#1976D2",
              };

              const newStyle = {
                width:
                  newVal < currentVal
                    ? ((currentVal - newVal) * 100) / 20 + "%"
                    : ((newVal - currentVal) * 100) / 20 + "%",
                height: "0.25rem",
                backgroundColor: newVal > currentVal ? "#4CAF50" : "#F44336",
              };

              return (
                <div key={index} style={{ width: "10rem" }}>
                  <h5 style={{ margin: 0 }}>
                    {stat.type} : {stat.value}
                  </h5>
                  <div
                    style={{
                      width: "10rem",
                      height: "0.25rem",
                      backgroundColor: "#A7CAED",
                      display: "flex",
                    }}
                  >
                    <div style={currStyle} />
                    <div style={newStyle} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Typography variant="h6">
        Founds after buying: <b>{props.newCoins}</b>
      </Typography>
      <Button
        disabled={props.item?.id === undefined}
        size="large"
        variant="contained"
        style={{ margin: "0 auto" }}
        onClick={handleBuy}
      >
        Buy
      </Button>
    </div>
  );
};

export default CompareCard;
