import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function () {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(-1)}>Back</Button>;
}
