import {
  TableRow,
  TableCell,
  LinearProgress,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { IEItem } from "../../types/state";
import { Dispatch, useState } from "react";
import { defineWeights } from "../../utils/defineWeights";
import {
  GlobalStateAction,
  GlobalStateActionKind,
} from "../../constants/context/globalState.context";

interface IETabShop {
  item: IEItem;
  solde?: number;
  isEquiped?: boolean;
  dispatch: Dispatch<GlobalStateAction>;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const TabShop = (props: IETabShop) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEquip = () => {
    props.dispatch({
      type: GlobalStateActionKind.EQUIP_ITEM,
      payload: props.item.id,
    });
  };

  props.item.image = props.item.image.replace("../../../", "/");

  const handleSell = () => {
    props.dispatch({
      type: GlobalStateActionKind.SELL_ITEM,
      payload: props.item.id,
    });
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box display="flex" flexDirection="column" sx={style} gap={5}>
          <Typography id="modal-modal-title" variant="h5">
            <b>{props.item.name}</b> : <b>{props.item.id}</b>
          </Typography>

          <Typography id="modal-modal-title" variant="body1">
            Original Price : <b>{props.item.sellingPrice}</b>
          </Typography>

          <Typography id="modal-modal-title" variant="body1">
            Selling Price : <b>{Math.floor(props.item.sellingPrice * 0.7)}</b>
          </Typography>

          <Typography id="modal-modal-title" variant="body1">
            New sold :{" "}
            <b>
              {Math.floor((props.solde ?? 0) + props.item.sellingPrice * 0.7)}
            </b>
          </Typography>

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "5rem" }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSell}>
              Sell
            </Button>
          </div>
        </Box>
      </Modal>
      <TableRow
        style={{
          backgroundColor: props.isEquiped ? "#edf2ff" : "white",
        }}
      >
        <TableCell>{props.item.id}</TableCell>
        <TableCell>{props.item.name}</TableCell>
        <TableCell>
          <img src={props.item.image + ".png"} alt="img" width={30} />
        </TableCell>
        <TableCell>{props.item.rarity}</TableCell>
        <TableCell>{props.item.type}</TableCell>
        {props.item?.statistiques?.map((stat, idx: number) => (
          <TableCell key={idx}>
            <LinearProgress
              variant="determinate"
              value={(stat.value * 100) / 20}
            />
            {stat.value}
          </TableCell>
        ))}

        <TableCell>{Math.ceil(defineWeights(props.item))}</TableCell>

        <TableCell>
          <b>${props.item.sellingPrice}</b>
        </TableCell>
        <TableCell>
          <Button disabled={props.isEquiped} onClick={handleEquip}>
            Equip
          </Button>
          <Button onClick={handleOpen}>Sell</Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TabShop;
