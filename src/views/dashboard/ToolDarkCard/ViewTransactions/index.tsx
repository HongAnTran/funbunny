

import {  Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../ui-component/extended/Avatar'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Stack } from '@mui/material'

function ViewTransactions() {
  const theme : any= useTheme()
  const navigation =  useNavigate()
  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' , cursor:"pointer" }}
         onClick={() =>{navigation('/history-transastion') }}
        >

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md" >
           <WorkHistoryIcon />
        </Avatar>
        <Typography textAlign="center" mt={1} >Lịch sử giao dịch</Typography>
        </Stack>

    </>
  )
}

export default ViewTransactions