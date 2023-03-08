

import {  Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../ui-component/extended/Avatar'

import { Stack } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
function AddTransaction() {
  const theme : any= useTheme()
  const navigation =  useNavigate()
  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' ,cursor:"pointer" }}
         onClick={() =>{navigation('/add-transastion') }}
        >

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md">
           <AddCardIcon />
        </Avatar>
        <Typography textAlign="center" mt={1} >Thêm giao dịch</Typography>
        </Stack>

    </>
  )
}

export default AddTransaction