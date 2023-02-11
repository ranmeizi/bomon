import React from "react";
import { useParams } from "react-router-dom";
import Nav from "@/components/Nav";

export default function ID() {
  const { id } = useParams();
  return (
    <div>
      {/* <Nav></Nav> */}
      id:{id} <input type="text" />
    </div>
  );
}
