import './App.css';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import {History} from './components/History';
import { TransactionForm } from './components/TransactionForm';
import { NavBar } from './components/NavBar';
import { GlobalProvider } from './context/GlobalState';

// Material UI components 
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <GlobalProvider>
      <Box sx={{ flexGrow: 1 }} className='main-font'>
        <NavBar></NavBar>
        <Grid container spacing={2}>
          <Grid item xs={4}>
          <Header></Header>
          <IncomeExpenses></IncomeExpenses>
          <Balance />
          </Grid>
          <Grid item xs={8}>
          <TransactionForm></TransactionForm>
          </Grid>
          <Grid item xs={12}>
          <History ></History>
          </Grid>
        </Grid>     
      </Box>
    </GlobalProvider>
  );
}

export default App;
