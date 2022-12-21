

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography , Grid , Tooltip } from '@mui/material';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import TotalIncomeCard from '../../../ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import WalletIcon from '@mui/icons-material/Wallet';
import EditIcon from '@mui/icons-material/Edit';
// styles
const CardWrapper = styled(MainCard)(({ theme } : { theme : any}) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading } : {isLoading : boolean}) => {
    const theme : any= useTheme();

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                     <Grid container justifyContent="space-between">

             
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.warning.light,
                                            color: theme.palette.warning.dark
                                        }}
                                    >
                                        <WalletIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4">$203k</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: theme.palette.grey[600],
                                                mt: 0.5
                                            }}
                                        >
                                            My wallet
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            
                        </List>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                <Tooltip title="Chỉnh sửa ví" placement="bottom"> 
                                    <Avatar 
                                       
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.warning.dark,
                                            color: theme.palette.warning.light,
                                               
                                        }}
                                    >
                                        <EditIcon  fontSize="inherit" />
                                    </Avatar>
                                    </Tooltip>
                                </ListItemAvatar>
                              
                            </ListItem>
                            
                        </List>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};



export default TotalIncomeLightCard;
