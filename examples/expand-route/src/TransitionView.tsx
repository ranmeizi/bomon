import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// @ts-ignore
import { TransitionOutlet } from "@bomon/expand-router";

export default function ({ id }: any) {
  return (
    <TransitionOutlet >
      <Outlet />
    </TransitionOutlet>
  );
}
