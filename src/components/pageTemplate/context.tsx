import React from 'react';

export const Context = React.createContext({});

const ContextProvider = ({ children, actions }) => {
    console.log(actions)
	return <Context.Provider value={actions}>{children}</Context.Provider>;
};

export default ContextProvider;
