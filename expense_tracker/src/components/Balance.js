import React,{useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const Balance = () => {
  const {transactions} = useContext(GlobalContext);
  const income = transactions
  .reduce((r,item)=>r+=item.income,0)
  .toFixed(2);

  const expense = transactions
  .reduce((r,item)=>r+=item.expense,0)
  .toFixed(2);

  const bal=income-expense;

  return <div>
      <Box sx={{mt:1}}>
      <Paper elevation={3} sx={{padding:'10px',backgroundColor:'#E8DCB8'}}>
        <h4>My Balance</h4>
        <h1>
             {bal} MMK.
        </h1>
        </Paper>
      </Box>
  </div>;
};
