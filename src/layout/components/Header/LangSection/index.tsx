
// material-ui
import React from 'react';
import { useTheme  } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,

} from '@mui/material';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// assets
import { listLanguages } from '../../../../config';
import { KEY_LANG_CONFIG } from '../../../../constans/constant';
// ==============================|| NOTIFICATION ||============================== //
import { useTranslation } from 'react-i18next';
const LangSection = () => {
    const theme : any = useTheme();
   const { i18n } = useTranslation()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
     const handleSelectLang = (lang : 'en' | 'vi' | string) => {
        localStorage.setItem(KEY_LANG_CONFIG ,JSON.stringify(lang))
        i18n.changeLanguage(lang)
        handleClose()
     }

    return (
        <>
            <Box
             sx={
                {  marginRight:2 }
             }
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(e :any)=>{handleClick(e)}}
                    >
                       {i18n.resolvedLanguage}
                    </Avatar>
                </ButtonBase>
            </Box>
            <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {listLanguages.map((lang, index)=>{
            return (
                <MenuItem onClick={() =>handleSelectLang(lang.value)} key={index} >{lang.name}</MenuItem>
            )
        })}
      </Menu>
        </>
    );
};

export default LangSection;
