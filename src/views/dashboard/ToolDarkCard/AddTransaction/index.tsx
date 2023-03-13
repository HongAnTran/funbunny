

import {  Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../../../ui-component/extended/Avatar'

import { Stack } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import { useTranslation } from 'react-i18next';
function AddTransaction() {
  const theme : any= useTheme()
  const navigation =  useNavigate()
  const { t } = useTranslation()

  return (
    <>
        <Stack justifyContent="center"  alignItems="center" sx={{ height:'100%' ,cursor:"pointer" }}
         onClick={() =>{navigation('/add-transaction') }}
        >

        <Avatar  sx={{
                ...theme.typography.commonAvatar,
                backgroundColor:'#ffffff',
                  }}
           size="md">
           <AddCardIcon />
        </Avatar>
        <Typography textAlign="center" mt={1} >{t('tool.add_transaction')}</Typography>
        </Stack>

    </>
  )
}

export default AddTransaction