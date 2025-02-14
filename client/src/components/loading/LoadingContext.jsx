import PropTypes from "prop-types";
import { createContext, useState, useMemo } from "react";


// Create a new context
const LoadingContext = createContext();
export { LoadingContext };


// Create a provider that will pass the loading
export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const value = useMemo(() => ({ loading, setLoading }), [loading, setLoading]);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
