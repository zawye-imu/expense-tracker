import React,{createContext, useContext,useReducer} from "react";
import AppReducer from './AppReducer';

// initial state 

var date= new Date();

const initialState = {
    transactions:
    [
    ],
    start_date:new Date(date.getFullYear(), date.getMonth(), 1),
    end_date:new Date(date.getFullYear(), date.getMonth() + 1, 0),
}

// Creating Context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state,dispatch] = useReducer(AppReducer,initialState);

    // Actions 
    function deleteTransaction(id)
    {
        dispatch({
            type:'DELETE_TRANSACTION',
            payload:id,
        })
    }

    function addTransaction(transaction)
    {
        dispatch({
            type:'ADD_TRANSACTION',
            payload:transaction,
        })
    }

    function assignTransactions(data)
    {
        dispatch({
            type:'ASSIGN_TRANSACTIONS',
            payload:data
        })
    }

    function assignDate(date,sore)
    {
        dispatch({
            type:'ASSIGN_DATE',
            payload:date,
            sore:sore,
        })
    }

    return <GlobalContext.Provider value={{
        transactions:state.transactions,
        start_date:state.start_date,
        end_date:state.end_date,
        deleteTransaction,
        addTransaction,
        assignTransactions,
        assignDate,
    }}>
        {children}
    </GlobalContext.Provider>
}