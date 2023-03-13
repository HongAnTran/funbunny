import React, {  useMemo } from "react";
import {  Transaction, } from "types/main";

import { useAuthContext } from "hooks";

import {
  Breadcrumbs,
  Typography,
} from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Link } from "react-router-dom";
import FormTransaction from "../formTransaction/FormTransaction";
function AddTransaction() {
  const { user } = useAuthContext();
  const initValueTransactions = useMemo(() => {
    const initValueTransactions: Transaction = {
      uid: user.uid,
      value: 0,
      typeTransaction: "spending",
      idCategory: '',
      wallet: "cash",
      note: "",
      imageDescription: "",
      date:{
        time: new Date().getTime(),
        date:new Date(),
        day: new Date().getDate(),
        month: new Date().getMonth()+1,
        year: new Date().getFullYear(),
      }
    };
    return initValueTransactions;
  }, [user]);


  return (
    <>

    <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Bảng điều khiển
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Thêm giao dịch
        </Typography>
      </Breadcrumbs>
      <div>
        <h1>Thêm giao dịch</h1>
      </div>
 <FormTransaction typeForm="add" data={initValueTransactions} />
    </>
  );
}

export default AddTransaction;
