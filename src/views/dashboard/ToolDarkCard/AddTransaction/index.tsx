
import React , { useState } from 'react'

import { Theme, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MainDialog from '../../../../ui-component/dialog/MainDialog'
import Avatar from '../../../../ui-component/extended/Avatar'
import AddTransactionsForm from './AddTransactionsForm'
import { Stack } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
function AddTransaction() {
  const [ openDialogAddTransactions , setOpenDialogAddTransactions] = useState<boolean>(false)
  const theme : any= useTheme()
  const navigation =  useNavigate()
  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' }}>

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md" onClick={() =>{navigation('/add-transastion') }}>
           <AddCardIcon />
        </Avatar>
        <Typography mt={1} >Add Transaction</Typography>
        </Stack>
      <MainDialog
        open={openDialogAddTransactions}
        setOpen={setOpenDialogAddTransactions}
        title="Add transactions"
        onClose={false}
      >
        <AddTransactionsForm />
      </MainDialog> 
    </>
  )
}

export default AddTransaction