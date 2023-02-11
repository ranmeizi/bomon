import React from "react";
import { Link } from "react-router-dom";

export default function () {
  return (
    <div>
      <Link to="/f/a">A</Link>
      <Link to="/f/b">B</Link>
      <Link to={`/f/id/${(Math.random() * 10).toFixed(0)}`}>randomid</Link>

      <Link to="/s/a">subA</Link>
    </div>
  );
}
