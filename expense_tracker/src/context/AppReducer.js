export default (state,action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => 
                    transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions:[action.payload, ...state.transactions,]
            }
        case 'ASSIGN_TRANSACTIONS':
            return {
                ...state,transactions:action.payload
            }
        case 'ASSIGN_DATE':
            if(action.sore == 'start')
            {
                return {
                    ...state,start_date:action.payload,
                }
            }
            else
            {
                return {
                    ...state,end_date:action.payload,
                }  
            }
                
           
        default:
            return state;
    }
}