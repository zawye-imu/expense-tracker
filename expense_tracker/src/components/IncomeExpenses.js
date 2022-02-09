import React,{useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

// MUI 
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const IncomeExpenses = () => {

  const {transactions} = useContext(GlobalContext);
  const income = transactions
  .reduce((r,item)=>r+=item.income,0)
  .toFixed(2);

  const expense = transactions
  .reduce((r,item)=>r+=item.expense,0)
  .toFixed(2);

  return <div>
        
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper elevation={3} sx={{padding:'10px',backgroundColor:'#E8DCB8'}}>
          <h4 className="money plus">Income</h4>
          <hr style={{backgroundColor:'white'}}></hr>
          <p className="money plus">+{income}</p>
          </Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper elevation={3} sx={{padding:'10px',backgroundColor:'#E8DCB8'}}>
          <h4 className="money minus">Expense</h4>
          <hr style={{backgroundColor:'white'}}></hr>
          <p className="money minus">-{expense}</p>
          </Paper>
        </Grid>
        </Grid>
        
        </div>;
};
