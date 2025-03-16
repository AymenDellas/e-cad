import React from "react";

const Buttons = ({ text }: { text: string }) => {
  return (
    <button
      className="py-2 px-4 bg-black text-white rounded-md"
      suppressHydrationWarning
    >
      {text}
    </button>
  );
};
export default Buttons;
