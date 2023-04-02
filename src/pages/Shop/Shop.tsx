import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../constants/context/globalState.context";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import CompareCard from "../../components/CompareCard/CompareCard";
import { IEItem } from "../../types/state";
import { defineWeights } from "../../utils/defineWeights";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Shop() {
  const { state } = useContext(GlobalStateContext);

  const { items } = state;

  const [columns, setColumns] = useState<any[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEItem>();
  const [currentItem, setCurrentItem] = useState<IEItem>();

  const handleOpen = (e: any) => {
    const current = state.inventory?.items
      .filter((i) => i.isEquipped)
      .map((i) => i.item);

    console.log("current", current);
    console.log("current", current);

    const selItem = items?.find((i) => i.id === e.id);

    if (!selItem) return;

    setSelectedItem(selItem);
    setCurrentItem(current?.find((i) => i.type === selItem.type) as IEItem);

    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!items) return;

    const newColumns = [
      { field: "id", headerName: "ID", width: 100 },
      // { field: "image", headerName: "image", width: 150 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "rarity", headerName: "rarity" },
      { field: "price", headerName: "Price", width: 90 },
      { field: "type", headerName: "Type", width: 90 },

      { field: "Power", headerName: "Power", width: 90 },
      { field: "Acceleration", headerName: "Acceleration", width: 90 },
      { field: "Grip", headerName: "Grip", width: 90 },
      { field: "HandlingAbility", headerName: "Handling ability", width: 90 },
      { field: "weight", headerName: "Weight", width: 90 },
      { field: "Wear", headerName: "Wear", width: 90 },
      {
        field: "EnergyConsumption",
        headerName: "Energy",
        width: 100,
      },
      { field: "total", headerName: "Score", width: 80 },
      { field: "status", headerName: "Status", width: 100 },
      { field: "seller", headerName: "Seller", width: 150 },
    ];

    const newRows = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        rarity: item.rarity,
        price: item.sellingPrice,
        type: item.type,

        // @ts-ignore
        Power: item.statistiques[0].value,
        // @ts-ignore
        Acceleration: item.statistiques[1].value,
        // @ts-ignore
        Grip: item.statistiques[2].value,
        // @ts-ignore
        HandlingAbility: item.statistiques[3].value,
        // @ts-ignore
        weight: item.statistiques[4].value,
        // @ts-ignore
        Wear: item.statistiques[5].value,
        // @ts-ignore
        EnergyConsumption: item.statistiques[6].value,

        total: Math.ceil(defineWeights(item)),

        status: item.status,
        seller: item.seller,
      };
    });

    setColumns(newColumns);
    setRows(newRows);
  }, [items]);

  return (
    <div style={{ height: 800, width: "100%" }}>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style, width: 1000 }}>
          <CompareCard
            item={selectedItem}
            current={currentItem}
            newCoins={
              (state.personal_team?.coin ?? 0) -
              (selectedItem?.sellingPrice ?? 0)
            }
          />
        </Box>
      </Modal>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={!state.loaded}
        // onRowClick={handleOpen}
        onRowDoubleClick={handleOpen}
      />
    </div>
  );
}
