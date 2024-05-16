import { toast } from "react-toastify";
import { PurchasesContainer, SearchContainer } from "../assets/components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({request}) => {
  console.log(request.url)
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])
  console.log(params)
  try {
    const { data } = await customFetch.get("/purchases", {
      params,
    });
    return { data, searchValues:{...params} };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const allPurchasesContext = createContext();
const AllPurchases = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <allPurchasesContext.Provider value={{ data, searchValues }}>
        <SearchContainer />
        <PurchasesContainer />
    </allPurchasesContext.Provider>
  );
};

export const useAllPurchasesContext = () => useContext(allPurchasesContext)

export default AllPurchases;
