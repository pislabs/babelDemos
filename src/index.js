import React from "react";
import ReactDOM from "react-dom";

import { add } from "./a";
import b from "@/b";

let p = Promise.resolve().finally();

const fn = async () => {
  return await [1, 2, 3].includes(1);
};

export default function App() {
  return {
    OK: "OK",
    X: add(1, 2),
  };
}
