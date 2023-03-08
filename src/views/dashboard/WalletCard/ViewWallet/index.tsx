import { Box, Grid, ListItem, ListItemAvatar, ListItemText, Stack, styled, Typography, useTheme } from "@mui/material";
import { gridSpacing } from "constans/constant";
import React from "react";
import { Wallet } from "types/main";
import MainCard from "ui-component/cards/MainCard";
import Avatar from "ui-component/extended/Avatar";
import PriceFormat from "ui-component/extended/PriceFormat";
import WalletIcon from "@mui/icons-material/Wallet";

// styles
const CardWrapper = styled(MainCard)(({ theme }: { theme: any }) => ({
  overflow: "hidden",
  position: "relative",
  width:'100%',
  border:'1px solid #ccc',
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
function ViewWallet({ data }: { data: Wallet }) {
  const theme: any = useTheme();

  return (
    <div>
      <Grid container spacing={gridSpacing} style={{minWidth:'300px'}}>
        <Grid item xs={12}>
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
                      {/* {t("wallet")} */}
                      Tiền mặt
                    </Typography>
                  }
                  primary={
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.warning.dark,
                      }}
                    >
                      <PriceFormat value={data.cash}  />
                    </Typography>
                  }
                />
              </ListItem>
        
           
            </Stack>
          </Box>
        </CardWrapper>
        </Grid>
        <Grid item xs={12}>
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
                      {/* {t("wallet")} */}
                      Tiết kiệm
                    </Typography>
                  }
                  primary={
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.warning.dark,
                      }}
                    >
                      <PriceFormat value={data.saving}  />
                    </Typography>
                  }
                />
              </ListItem>
        
           
            </Stack>
          </Box>
        </CardWrapper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ViewWallet;
