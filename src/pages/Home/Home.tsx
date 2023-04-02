import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../constants/context/globalState.context";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CompareCard from "../../components/CompareCard/CompareCard";

const Home = () => {
  const [rows, setRows] = useState<any[]>([]);

  const {
    state: { personal_team },
  } = useContext(GlobalStateContext);

  useEffect(() => {
    if (!personal_team) return;

    const newRows = [];

    for (const [key, value] of Object.entries(personal_team)) {
      if (key === "vehicle") continue;
      newRows.push({ key, value });
    }

    setRows(newRows);
  }, [personal_team]);

  return (
    <>
      <h1>Infos</h1>

      <CompareCard />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
