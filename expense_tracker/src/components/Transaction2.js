import React,{useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

// MUI
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import IconButton from '@mui/material/IconButton';

import axios from 'axios';

import { useAlert } from 'react-alert'

export const Transaction2 = ({transaction}) => {

  const alert = useAlert()
  const {deleteTransaction} = useContext(GlobalContext);

  const userDateformat = (d) => {
    var datearray = d.split("-");
    var newdate = datearray[1] + '/' + datearray[2] + '/' + datearray[0];
    return newdate;
  }
    
  const handleDelete = (id) => {
    
    axios.delete('http://localhost:8000/api/incexp/'+id+'/',{
      auth: {
        username:'admin',
        password:'zawyehtet12345',
      }
    })
    .then(alert.success("Successfully Deleted!",{
      timeout: 3000, 
      type:'success',
    }))
    .then(deleteTransaction(id))
    .catch((err)=>console.log(err))
    
  }

  return (
    <TableRow
              key={transaction.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.description}
              </TableCell>
              <TableCell align="right">{userDateformat(transaction.date)}</TableCell>
              <TableCell align="right">{transaction.income}</TableCell>
              <TableCell align="right">{transaction.expense}</TableCell>
              <TableCell align="right">{transaction.category}</TableCell>
              <TableCell align="right">{transaction.status}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="delete" color="error" onClick={()=>handleDelete(transaction.id)}>
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </TableCell>
    </TableRow>
  )
      
};
