import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [accounts, setAccounts] = useState({ username: "", name: "" });
  return (
    <DataContext.Provider
      value={{
        accounts,
        setAccounts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
