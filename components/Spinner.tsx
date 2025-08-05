import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center py-2 flex-row gap-2">
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]" />
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]" />
      <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]" />
    </div>
  );
};

export default Spinner;
