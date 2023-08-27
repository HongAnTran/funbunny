import React from 'react'
import { useEffect, useState } from "react";

// material-ui
import { Breadcrumbs, Grid,  TextField, Typography, } from "@mui/material";

import { gridSpacing } from "../../constans/constant";
import { Stack } from "@mui/system";

import useGetDocs from "hooks/usegGetDocs";
import { Transaction, } from "types/main";
import { calculateMillisecondDate } from "controllers/date";

import MainCard from "ui-component/cards/MainCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { formatDataChart } from "controllers/chart";

import { IconLayoutKanban } from '@tabler/icons';

import { caculateTotalValueTransactions } from "controllers/transaction/transaction";
import { useAuthContext } from "hooks";
import PriceFormat from "ui-component/extended/PriceFormat";
import CardTask from './card/CardTask';
import Cards from './card/Cards';


function Tasks() {
  const [items, setItems] = React.useState<any>([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ]);


  return (
    <>
    <Grid container spacing={3}>
    <Grid item md={12} sm={12} lg={12} xs={12}>
      <MainCard>

    <Breadcrumbs aria-label="breadcrumb">
        <IconLayoutKanban  style={{marginRight:6 , marginTop:4}} fontSize="inherit"  />
      <Typography
        variant="h3"
        textTransform="uppercase"
        > 
        Quản lý công việc
      </Typography>
    </Breadcrumbs>
          </MainCard>
  </Grid>

      <Grid item md={12} sm={12} lg={12} xs={12}>
        <MainCard content={true}>
        <div className="flex space-x-4">
       <Cards></Cards>
       </div>
        </MainCard>
      </Grid>
    </Grid>
  </>
  )
}

export default Tasks