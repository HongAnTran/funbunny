
import React , { useState } from 'react'

import { Theme, Typography, useTheme } from '@mui/material'

import MainDialog from '../../../../ui-component/dialog/MainDialog'
import Avatar from '../../../../ui-component/extended/Avatar'
import AddTransactionsForm from './AddTransactionsForm'
import { Stack } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
function AddTransaction() {
  const [ openDialogAddTransactions , setOpenDialogAddTransactions] = useState<boolean>(false)
  const theme : any= useTheme()

  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' }}>

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md" onClick={() =>{setOpenDialogAddTransactions(true) }}>
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