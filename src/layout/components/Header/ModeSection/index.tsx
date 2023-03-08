
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ButtonBase,

} from '@mui/material';


import { useDispatch , useSelector } from 'react-redux';
import { RootState  } from '../../../../redux/store'
import { toogleMode  } from '../../../../redux/slices/customSlice/customSlice'

// assets
import { IconMoon, IconSun } from '@tabler/icons';


// ==============================|| NOTIFICATION ||============================== //

const ModeSection = () => {
    const theme : any = useTheme();
    const dispatch  = useDispatch();
    const customization = useSelector((state : RootState) => state.custom);

     const handleToggle = () => {
        dispatch(toogleMode())
     }
    return (
        <>
            <Box
               sx={{
                mr: 2,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}
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
                        onClick={handleToggle}
                        color="inherit"
                    >
                       {customization.mode ==='light' ?  <IconMoon stroke={1.5} size="1.3rem" /> : <IconSun stroke={1.5} size="1.3rem" />} 
                    </Avatar>
                </ButtonBase>
            </Box>
         
        </>
    );
};

export default ModeSection;
