import React,{useContext,useEffect} from 'react';
import ReactDatePicker from 'react-datepicker';
import { GlobalContext } from '../context/GlobalState';
import { dateToServerFormat } from '../helpers/dateHelpers';

// MUI
import { Box,Button } from '@mui/material';

import axios from 'axios';

export const DateRange = () => {

  const {assignTransactions,start_date,end_date,assignDate} = useContext(GlobalContext);

    
  const handleFilter = () => {

    const f_start_date=dateToServerFormat(start_date);
    const f_end_date = dateToServerFormat(end_date);
    axios.get('http://localhost:8000/api/incexp/?start_date='+f_start_date+'&end_date='+f_end_date).then(
        (res)=>{
          assignTransactions(res.data);
        }
      )
      .catch((err)=>console.log(err))
  }


  return (<div>
                <Box>
                    From:
                <ReactDatePicker className='fancy-button' selected={start_date} onChange={(date) => assignDate(date,'start')} />
                </Box>
                <Box sx={{mt:3,}}>
                To:<ReactDatePicker  className='fancy-button' selected={end_date} onChange={(date) => assignDate(date,'end')} /> 
                </Box>
                <Button sx={{mt:3}} variant="outlined" onClick={()=> handleFilter()}>Filter</Button>

  </div>);
};
