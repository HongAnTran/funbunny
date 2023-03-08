// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, CardContent, Divider, Grid, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "constans/constant";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import useGetDocs from "hooks/usegGetDocs";
import { Transaction } from "types/main";
import { useAuthContext } from "hooks";
import PriceFormat from "ui-component/extended/PriceFormat";
import CategoryTransaction from "ui-component/extended/CategoryTransaction";
import FormatTime from "ui-component/extended/FormatTime";

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const TransactionsViewCard = () => {
  const theme: any = useTheme();
  const { user } = useAuthContext();
  const [transactions, isLoading] = useGetDocs<Transaction>(
    "transactions",
    [],
    [
      {
        fieldname: "uid",
        operation: "==",
        value: user.uid,
      },
    ],
    5,
    {
      type: "desc",
      field: "date.time",
    }
  );
  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} sx={{ height: "100%" }}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h4">Giao dịch gần đây</Typography>
                  </Grid>
                  <Grid item>
                    {/* <Link style={{...theme.typography.h5 , textDecoration:"none"}} to="/analyst">Xem thêm </Link> */}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {transactions.length > 0 ? (
                  transactions.map((tran) => {
                    return (
                      <div key={tran._id} style={{ marginBottom: 18 }}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item md={4}>
                            <Typography variant="subtitle1" color="inherit">
                              <CategoryTransaction
                                idCategory={tran.idCategory}
                                type={tran.typeTransaction}
                              />
                            </Typography>
                          </Grid>
                          <Grid item md={4}>
                            {tran.timestamp && (
                              <FormatTime time={tran.date.time}></FormatTime>
                            )}
                          </Grid>
                          <Grid item md={4}>
                            <Grid container justifyContent="flex-end">
                              <Grid item>
                                <PriceFormat value={tran.value} />
                              </Grid>
                              <Grid item>
                                {tran.typeTransaction === "income" ? (
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: "5px",
                                      backgroundColor:
                                        theme.palette.success.light,
                                      color: theme.palette.success.dark,
                                      ml: 1,
                                    }}
                                  >
                                    <KeyboardArrowUpOutlinedIcon
                                      fontSize="small"
                                      color="inherit"
                                    />
                                  </Avatar>
                                ) : (
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      width: 16,
                                      height: 16,
                                      borderRadius: "5px",
                                      backgroundColor:
                                        theme.palette.orange.light,
                                      color: theme.palette.orange.dark,
                                      marginLeft: 1.875,
                                    }}
                                  >
                                    <KeyboardArrowDownOutlinedIcon
                                      fontSize="small"
                                      color="inherit"
                                    />
                                  </Avatar>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 2 }} />
                      </div>
                    );
                  })
                ) : (
                  <p>Chưa có giao dịch nào</p>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default TransactionsViewCard;
