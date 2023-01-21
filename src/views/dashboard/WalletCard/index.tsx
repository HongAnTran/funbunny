// material-ui
import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Wallet } from "../../../types/main";

import { useAuthContext  ,  useGetDocRealTime,  } from "../../../hooks";

import TotalIncomeCard from "../../../ui-component/cards/Skeleton/TotalIncomeCard";
import PriceFormat from "ui-component/extended/PriceFormat";


import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
// project imports
import MainCard from "../../../ui-component/cards/MainCard";

import WalletIcon from "@mui/icons-material/Wallet";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MainDialog from "../../../ui-component/dialog/MainDialog";
import ViewWallet from "./ViewWallet";
import EditWallet from "./EditWallet";



// styles
const CardWrapper = styled(MainCard)(({ theme }: { theme: any }) => ({
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const WalletCard = ({ isLoading }: { isLoading: boolean }) => {
  // hooks
  const { user } = useAuthContext()
  const { t } = useTranslation("translation", { keyPrefix: "common" });
  const theme: any = useTheme();

  // get wallet from server
  const [ walletvalue ]  = useGetDocRealTime<Wallet>('wallet',user.uid , { 
    total : 0,
    saving : 0,
    cash : 0,
    uid: user.uid,  
  })

  

  


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openView, setOpenView] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);



  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <>
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 3 }}>
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <ListItem disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.dark,
                      color: theme.palette.warning.light,
                    }}
                  >
                    <WalletIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.grey[600],
                        mt: 0.5,
                        textTransform: "capitalize",
                        fontSize: 16,
                      }}
                    >
                      {t("wallet")}
                    </Typography>
                  }
                  primary={
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.warning.dark,
                      }}
                    >
                      <PriceFormat value={walletvalue.total} />
                    </Typography>
                  }
                />
              </ListItem>
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={()=>{setOpenView(true)}}>
                  <ListItemIcon>
                    <VisibilityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t("view")}</ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{setOpenEdit(true)}}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>{t("edit")}</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </CardWrapper>

            <MainDialog open={openView} setOpen={setOpenView}  title="View Wallet" >
                <ViewWallet data={walletvalue}/>
             </MainDialog>    

             <MainDialog open={openEdit} setOpen={setOpenEdit}  title="Edit Wallet" >
                <EditWallet data={walletvalue}/>
             </MainDialog>    
        </>
      )}


    </>
  );
};

export default WalletCard;
