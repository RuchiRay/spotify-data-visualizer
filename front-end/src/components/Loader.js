import React from "react";
import { Bars } from "react-loader-spinner";
const Loader = () => {
  return (
    <div>
      <Bars
        heigth="100"
        width="100"
        color="#22c55e"
        ariaLabel="loading-indicator"
      />
    </div>
  );
};

export default Loader;
