import { useEffect, useState } from "react";

// material-ui
import { Breadcrumbs, Grid,  TextField, Typography, } from "@mui/material";

import { gridSpacing } from "../../constans/constant";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { Stack } from "@mui/system";
import CircleChart from "./CircleChart";
import useGetDocs from "hooks/usegGetDocs";
import { Transaction, } from "types/main";
import { calculateMillisecondDate } from "controllers/date";

import MainCard from "ui-component/cards/MainCard";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { formatDataChart } from "controllers/chart";


import { IconDeviceAnalytics} from '@tabler/icons';
import { caculateTotalValueTransactions } from "controllers/transaction/transaction";
import { useAuthContext } from "hooks";


function Report() {
  const { user } = useAuthContext();

  const [dataCircleSpending, setDataCircleSpending] = useState<{
    labels: string[];
    series: number[];
  }>({ labels: [], series: [] });
  const [dataCircleIncome, setDataCircleIncome] = useState<{
    labels: string[];
    series: number[];
  }>({ labels: [], series: [] });

  const [dataChartColum, setDataChartColum] = useState<{
    labels: string[];
    series: any[];
  }>({ labels: [], series: [] });

  const [dateFrom, setDateFrom] = useState<number>(calculateMillisecondDate(1));
  const [dateTo, setDateTo] = useState<number>(new Date().getTime());

  const [data, isLoading] = useGetDocs<Transaction>(
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
        value: dateFrom,
      },
      {
        fieldname: "date.time",
        operation: "<=",
        value: dateTo,
      },
    ],
    0
  );



  useEffect(() => {
    if (data.length > 0) {
    const dataSpending = data.filter((data) => data.typeTransaction === "spending");
    const dataIncome = data.filter((data) => data.typeTransaction === "income");
    const dataChartSpending = formatDataChart(dataSpending , 'spending')
    const dataChartIncome = formatDataChart(dataIncome , 'income')
    const dataChartColum = {
        labels: [`${new Date(dateFrom).getDate()}/${new Date(dateFrom).getMonth() + 1} - ${new Date(dateTo).getDate()}/${new Date(dateTo).getMonth() + 1}`],
        series:[
            {
                name: 'Kho???n chi',
                data: [caculateTotalValueTransactions(dataSpending)]
            },
            {
                name: 'Kho???n thu',
                data: [caculateTotalValueTransactions(dataIncome)]
            },
        ]
      }
      setDataCircleSpending({ labels: dataChartSpending.labels, series: dataChartSpending.series });
      setDataCircleIncome({ labels: dataChartIncome.labels, series: dataChartIncome.series });
      setDataChartColum(dataChartColum)

    } else {
      setDataCircleSpending({ labels: [], series: [] });
      setDataCircleIncome({ labels: [], series: [] });
      setDataChartColum({ labels: [], series: [] })

    }
  }, [data , dateFrom , dateTo]);

  
  return (
    <>
      <Grid container spacing={gridSpacing}>
      <Grid item md={12} sm={12} lg={12}>
        <MainCard>

      <Breadcrumbs aria-label="breadcrumb">
          <IconDeviceAnalytics  style={{marginRight:6 , marginTop:4}} fontSize="inherit"  />
        <Typography
          variant="h3"
          textTransform="uppercase"
          > 
          B??o c??o chi ti??u
        </Typography>
      </Breadcrumbs>
            </MainCard>
    </Grid>
 
        <Grid item md={12} sm={12} lg={12}>
          <MainCard content={true}>
            <Grid container spacing={gridSpacing}>
              <Grid item md={12} sm={12} xs={12} lg={12}>
                <Stack spacing={2} direction="row">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      value={dateFrom}
                      onChange={(newValue: any) => {
                        setDateFrom(new Date(newValue)?.getTime());
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowRightAltIcon />
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      inputFormat="DD/MM/YYYY"
                      value={dateTo}
                      onChange={(newValue: any) => {
                        setDateTo(new Date(newValue)?.getTime());
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Stack>
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CircleChart
                  isLoading={isLoading}
                  data={dataCircleSpending}
                  title="T??? l??? kho???n chi"
                />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CircleChart
                  isLoading={isLoading}
                  data={dataCircleIncome}
                  title="T??? l??? kho???n thu"
                />
              </Grid>
              <Grid item lg={4} md={12} sm={12} xs={12} >
              <TotalGrowthBarChart isLoading={isLoading} data={dataChartColum} />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

export default Report;
