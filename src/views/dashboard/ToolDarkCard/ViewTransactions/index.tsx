

import {  Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../ui-component/extended/Avatar'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next';

function ViewTransactions() {
  const theme : any= useTheme()
  const navigation =  useNavigate()
  const { t } = useTranslation()

  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' , cursor:"pointer" }}
         onClick={() =>{navigation('/transaction-history') }}
        >

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md" >
           <WorkHistoryIcon />
        </Avatar>
        <Typography textAlign="center" mt={1} >{t('tool.transaction_history')}</Typography>
        </Stack>

    </>
  )
}

export default ViewTransactions