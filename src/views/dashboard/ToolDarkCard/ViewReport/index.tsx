

import {  Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../ui-component/extended/Avatar'
import { Stack } from '@mui/material'
import { IconDeviceAnalytics} from '@tabler/icons';

function ViewReport() {
  const theme : any= useTheme()
  const navigation =  useNavigate()
  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' , cursor:"pointer" }}
         onClick={() =>{navigation('/report') }}
        >

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md" >
           <IconDeviceAnalytics />
        </Avatar>
        <Typography textAlign="center" mt={1} >Báo cáo chi tiêu</Typography>
        </Stack>

    </>
  )
}

export default ViewReport