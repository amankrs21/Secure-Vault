import { useContext } from "react";

import { LoadingContext } from "../contexts/LoadingContext";


// Custom hook to use the LoadingContext
export const useLoading = () => useContext(LoadingContext);
