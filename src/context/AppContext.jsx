import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utils/apiFetch";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setloading] = useState(true);
  const [selectedcategory, setselectedcategory] = useState("New");
  const [searchResults, setsearchResults] = useState(null);
  const [mobilemenu, setmobilemenu] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [isfocused, setisfocused] = useState(true);

  const fetchCategoriesWiseData = async (query) => {
    setloading(true);
    let res = await fetchData(`search/?query=${query}`);
    setsearchResults(res?.contents);
    setloading(false);
  };

  useEffect(() => {
    fetchCategoriesWiseData(selectedcategory);
  }, [selectedcategory]);

  return (
    <AppContext.Provider
      value={{
        loading,
        selectedcategory,
        searchResults,
        mobilemenu,
        setselectedcategory,
        setsearchResults,
        setmobilemenu,
        searchquery,
        setsearchquery,
        isfocused,
        setisfocused
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default function useApp() {
  return useContext(AppContext);
}
