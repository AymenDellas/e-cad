import React from "react";
import { MoonLoader } from "react-spinners";
const loading = () => {
  return (
    <div className="top-0 left-0 flex items-center h-screen justify-center">
      <MoonLoader size={80} />
    </div>
  );
};

export default loading;
