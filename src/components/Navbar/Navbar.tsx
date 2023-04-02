import { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GlobalStateContext } from "../../constants/context/globalState.context";

const Navbar = () => {
  const {
    state: { personal_team },
  } = useContext(GlobalStateContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"> Stop This! </Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            money: <b>{personal_team?.coin}</b>
          </Typography>
          <Button color="inherit">
            <Link to="/">Profil</Link>
          </Button>
          <Button color="inherit">
            <Link to="/shop">Magasin</Link>
          </Button>
          <Button color="inherit">
            <Link to="/Races">Courses</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
