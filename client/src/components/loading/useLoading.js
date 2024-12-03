import { useContext } from "react";
import { LoadingContext } from "./LoadingContext.jsx";

export const useLoading = () => useContext(LoadingContext);
