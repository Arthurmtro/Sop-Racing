import { Card } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const CardShop = (props: any) => {
  props.item.image = props.item.image.replace("../../../", "/");

  const GenerateStats = (): JSX.Element => {
    return props.item.statistiques.map((stat: any, idx: number) => (
      <Typography key={idx} variant="body2" component="div">
        {stat.type}: <LinearProgress variant="determinate" value={stat.value} />
      </Typography>
    ));
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.item.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.item.type}
        </Typography>
        <img src={`${props.item.image}.png`} alt="image" width="30" />
        <Typography variant="body2">Prix: {props.item.sellingPrice}</Typography>
      </CardContent>
      <CardActions>
        <Accordion>
          <AccordionSummary>
            <Typography variant="h6" component="div">
              Statistiques
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <GenerateStats />
            </List>
          </AccordionDetails>
        </Accordion>
      </CardActions>
      <CardActions>
        <Button variant="contained">Acheter</Button>
      </CardActions>
    </Card>
  );
};

export default CardShop;
