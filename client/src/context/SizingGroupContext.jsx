import React, { createContext, useState } from "react";

export const SizingGroupContext = createContext({
  sizingGroup: "all",
  setSizingGroup: () => {},
});

const SizingGroupContextProvider = (props) => {
  const [sizingGroup, setSizingGroup] = useState("all");

  return (
    <SizingGroupContext.Provider value={{ sizingGroup, setSizingGroup }}>
      {props.children}
    </SizingGroupContext.Provider>
  );
};

export default SizingGroupContextProvider;
