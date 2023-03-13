import React, { useEffect, useState } from "react";
import { useAuthContext } from "hooks";
import {
  Breadcrumbs,
  Typography,
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { Link, useNavigate } from "react-router-dom";
import FormTransaction from "../formTransaction/FormTransaction";
import { Transaction } from "types/main";
import { getDocController } from "controllers/common";
import { useParams } from "react-router-dom";

function EditTransaction() {
  // const { transaction } = useLoaderData() as { transaction : Transaction}
  const { user } = useAuthContext();
  const navigation = useNavigate();
  const [ data , setData ] = useState<Transaction>({
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
  })
  const { transactionId } = useParams()
  useEffect(() => {
    (async () => {
    try {
      if(transactionId){
        const transaction = await getDocController('transactions',transactionId)
        if(transaction){
          setData(transaction);
        }else{
          navigation('/**')
        }
      }
    } catch (error) {
      navigation('/**')
    }
    })()

  }, [transactionId , navigation]);

  return (
    <>
    <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Bảng điều khiển
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary" >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Sửa giao dịch
        </Typography>
      </Breadcrumbs>
      <div>
        <h1>Sửa giao dịch</h1>
      </div>
      <FormTransaction typeForm="edit" data={data}  id={transactionId}/>
    </>
  );
}

export default EditTransaction;
