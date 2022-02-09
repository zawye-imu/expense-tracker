import React,{useState,useContext,forwardRef,useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { DateRange } from './DateRange';
// MUI 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// Datepicker 
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

import { useAlert } from 'react-alert';

export const TransactionForm = () => {
    const [text,setText]=useState('');
    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);
    const [status,setStatus]=useState('DONE');
    const [category,setCategory]=useState('FUN');
    const [startDate, setStartDate] = useState(new Date());

    const {addTransaction} = useContext(GlobalContext);

    const alert = useAlert()

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <TextField className="example-custom-input" onClick={onClick} ref={ref} label="Date" variant="outlined"
      value={value} size='small'>
      </TextField>
    ));

    const handleChange = (event) => {
      if (event.target.name == 'status') setStatus(event.target.value);
      if (event.target.name == 'category') setCategory(event.target.value);
      
    }

    const dateFormatted = (d) => {
      var datestring = ("0"+(d.getMonth()+1)).slice(-2) + "/"+("0" + d.getDate()).slice(-2) + "/" +
       d.getFullYear();
      return datestring;
    }

    const dateToServerFormat = (d) => {
      var datestring = d.getFullYear()+"-"+ ("0"+(d.getMonth()+1)).slice(-2) + "-" +("0" + d.getDate()).slice(-2);
      return datestring;
    }

    const onSubmit = e => {
      e.preventDefault();
      // Amount is added a sign at the front because it is a string if not changed. 
      const newd = dateFormatted(startDate);
      const server_date= dateToServerFormat(startDate);
      const newTransaction = {
        description:text,
        income:+income,
        expense:+expense,
        status:status,
        category:category,
        date:newd,
      }
      addTransaction(newTransaction);

      newTransaction.date = server_date;

      axios.post("http://localhost:8000/api/incexp/", newTransaction, {auth: {
        username:'admin',
        password:'zawyehtet12345',
      }}
      )
      .then(alert.success("Successfully Created!",{
        timeout: 3000, 
        type:'success',
      }))
      .catch((res) => {console.log(res)})

    }




  return <div>
          <h3>Add new transaction</h3>
            <Grid container direction="row" alignItems="flex-start" >
            <Grid item xs={4}>
            <FormControl>
                <FormControl>
                  
                <TextField id="outlined-basic" size="small" label="Text" variant="outlined"  value={text} onChange={(e)=>setText(e.target.value)} />
                </FormControl>
                <FormControl>
                <TextField sx={{mt:3}} id="outlined-basic" size="small" label="Income" type='number' variant="outlined"  value={income} onChange={(e)=>setIncome(e.target.value)} />
                </FormControl>
                <FormControl>
                <TextField sx={{mt:3}} id="outlined-basic" size="small" label="Expense" type='number' variant="outlined"  value={expense} onChange={(e)=>setExpense(e.target.value)} />
                </FormControl>
                <FormControl sx={{mt:3}}>
                <InputLabel id="status-simple-select-standard-label">Status</InputLabel>
                <Select
                  labelId="status-simple-select-label"
                  id="status-simple-select"
                  value={status}
                  label="Status"
                  name="status"
                  onChange={handleChange}
                  size="small"
                  
                >
                  <MenuItem value='DONE'>Done</MenuItem>
                  <MenuItem value='NOT DONE'>Not Done</MenuItem>
                </Select>
                </FormControl>
              </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl>
                <FormControl>
                <InputLabel id="cat-simple-select-standard-label">Category</InputLabel>
                <Select
                  labelId="cat-simple-select-label"
                  id="cat-simple-select"
                  value={category}
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  size="small"
                  sx={{minWidth:'200px'}}
                  
                >
                  <MenuItem value='FUN'>Fun</MenuItem>
                  <MenuItem value='NEED TO'>Need To</MenuItem>
                  <MenuItem value='INVESTMENT'>Investment</MenuItem>
                  <MenuItem value='UNEXPECTED'>Unexpected</MenuItem>
                </Select>
                </FormControl>
                <Box sx={{mt:3,}}>
                <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} customInput={<ExampleCustomInput />} />
                </Box>
                </FormControl>
                </Grid>
                <Grid item xs={4}>
                      <DateRange></DateRange>
                </Grid>
                <Button sx={{mt:3}} variant="outlined" onClick={onSubmit}>Add</Button>
                
                
              </Grid>
  </div>;
};
