import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
