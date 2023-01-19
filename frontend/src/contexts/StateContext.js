import React, { createContext, useState } from "react";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [childView, setChildView] = useState(null);
  const [childMode, setChildMode] = useState(false);
  const [giftForEdit, setGiftForEdit] = useState({});
  
  const state = { user, setUser,childView, setChildView,childMode, setChildMode,giftForEdit, setGiftForEdit};
  
  return (
    <StateContext.Provider value={state}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateContextProvider };
