import Page from "../components/Page";
import React from "react";
import Back from "../components/Back";
import { TextField, Box } from "@mui/material";

export default function Rectnts() {
  return (
    <Page>
      <div> Rectnts </div>
      <Box sx={{padding:2}}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <div>text will be cache when the History POP</div>
      <Back />
    </Page>
  );
}
