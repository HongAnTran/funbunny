import {  useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography, Button } from "@mui/material";
// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonEarningCard from "ui-component/cards/Skeleton/EarningCard";
// assets
import EarningIcon from "assets/images/icons/earning.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useTranslation } from "react-i18next";
import PriceFormat from "ui-component/extended/PriceFormat";
import React from "react";
import useGetDocs from "hooks/usegGetDocs";
import { Transaction } from "types/main";
import { caculateTotalValueTransactions } from "controllers/transaction/transaction";
import { calculateMillisecondDate } from "controllers/date";
import DotLoading from "ui-component/extended/dotLoading/DotLoading";
import { useAuthContext } from "hooks";

const CardWrapper = styled(MainCard)(({ theme }: { theme: any }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.dark.dark
      : theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  height: "100%",
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
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    zIndex: 1,

    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    zIndex: 1,

    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const SpendingCard = ({ isLoading }: { isLoading?: boolean }) => {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const { user } = useAuthContext();

  const [timeValue, setTimeValue] = useState(true); // false là tổng số tiền giao dich tháng này true là ngày hôm nay

  const [distanceTime, setDistanceTime] = useState(calculateMillisecondDate());

  const [valueTransaction, setValueTransaction] = useState(0); // tổng số tiên giao dịch
  const handleChangeTime = (event: any, newValue: any) => {
    const timeOfOneDay = calculateMillisecondDate();
    const timeOfOneMonth = calculateMillisecondDate(1);
    if (newValue !== timeValue) {
      if (newValue) {
        setDistanceTime(timeOfOneDay);
      } else {
        setDistanceTime(timeOfOneMonth);
      }
      setTimeValue(newValue);
    }
  };

  const [listTran, isLoadingTran] = useGetDocs<Transaction>(
    "transactions",
    [],
    [
      {
        fieldname: "uid",
        operation: "==",
        value: user.uid,
      },
      {
        fieldname: "date.time",
        operation: ">=",
        value: distanceTime,
      },
      { fieldname: "typeTransaction", operation: "==", value: "spending" },
    ],
    0,
    { type: "desc", field: "date.time" }
  );

  React.useEffect(() => {
      setValueTransaction(caculateTotalValueTransactions(listTran));
  }, [listTran]);
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                        mt: 1,
                      }}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Grid item>
                      <Button
                        disableElevation
                        variant={timeValue ? "contained" : "text"}
                        size="small"
                        sx={{ color: "inherit" }}
                        onClick={(e) => handleChangeTime(e, true)}
                      >
                        {t("card.today")}
                                         

                      </Button>
                      <Button
                        disableElevation
                        variant={!timeValue ? "contained" : "text"}
                        size="small"
                        sx={{ color: "inherit" }}
                        onClick={(e) => handleChangeTime(e, false)}
                      >
                        {t("card.this_month")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {isLoadingTran ? (
                        <div style={{ width: 40  , height: 60 , display: 'flex' , justifyContent:'center' , alignItems: 'center'}}>
                          <DotLoading  />
                        </div>
                      ) : (
                        <PriceFormat value={valueTransaction} />
                      )}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark,
                      }}
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                      />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[200],
                  }}
                >
                  {t("card.total_spending")}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default SpendingCard;
