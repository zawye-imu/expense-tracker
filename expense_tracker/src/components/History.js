import React,{useContext,useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction2 } from './Transaction2';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from 'axios';

import {dateToServerFormat,dateFormatted} from '../helpers/dateHelpers';

export const History = () => {
  const {transactions,assignTransactions,start_date,end_date,assignDate} = useContext(GlobalContext);


  useEffect(() => {
    // Get data base on filtering dates
    const f_start_date=dateToServerFormat(start_date);
    const f_end_date = dateToServerFormat(end_date);
    axios.get('http://localhost:8000/api/incexp/?start_date='+f_start_date+'&end_date='+f_end_date).then(
        (res)=>{
          assignTransactions(res.data);
        }
      )
      .catch((err)=>console.log(err))
  },[])

  return <div>
          <h3>History</h3>
          From <strong>{dateFormatted(start_date)}</strong> To <strong>{dateFormatted(end_date)}</strong>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead >
            <TableRow >
              <TableCell style={{fontWeight:'bold'}}>Description</TableCell>
              <TableCell align="right" style={{fontWeight:'bold'}}>Date</TableCell>
              <TableCell align="right" style={{fontWeight:'bold'}}>Income</TableCell>
              <TableCell align="right" style={{fontWeight:'bold'}}>Expense</TableCell>
              <TableCell align="right" style={{fontWeight:'bold'}}>Category</TableCell>
              <TableCell align="right" style={{fontWeight:'bold'}}>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <Transaction2 key={transaction.id} transaction={transaction}></Transaction2>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
  </div>;
};
