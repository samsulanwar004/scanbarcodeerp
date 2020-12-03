import React, {createContext, useReducer} from "react";
import combineReducers from 'react-combine-reducers';
import {Auth, Account} from './Reducer';

const initialAuth = {
    isLoading: true,
    isSignout: false,
    accessToken: null
};

const initialProfile = {
    profile: null,
};

const [globalReducer, initialGlobal] = combineReducers({
    auth: [Auth, initialAuth],
    account: [Account, initialProfile]
});

const Store = ({children}) => {
	
    const [state, dispatch] = useReducer(globalReducer, initialGlobal);

    console.log(state);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialGlobal);
export default Store;