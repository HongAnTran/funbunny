import React from "react";
// material-ui
import { styled, } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

import AddTransaction from "./AddTransaction";

// project imports
import MainCard from "../../../ui-component/cards/MainCard";
import TotalIncomeCard from "../../../ui-component/cards/Skeleton/TotalIncomeCard";
import {
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { gridSpacing } from "../../../constans/constant";
import ViewTransactions from "./ViewTransactions";
import ViewReport from "./ViewReport";


// styles
const CardWrapper = styled(MainCard)(({ theme }: { theme: any }) => ({
  overflow: "hidden",
  position: "relative",
  height: "100%",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary.main} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary.main} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const ToolDarkCard = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h4">Tools</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    "& > :not(style)": {
                      m: 1,
                      width: '100%',
                      height: 128,
                    },
                  }}
                >
                  <Paper variant="outlined" > 
                     <AddTransaction />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    "& > :not(style)": {
                      m: 1,
                      width: '100%',

                      height: 128,
                    },
                  }}
                >
                   <Paper variant="outlined" > 
                     <ViewTransactions />
                  </Paper>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    "& > :not(style)": {
                      m: 1,
                      width: '100%',

                      height: 128,
                    },
                  }}
                >
                   <Paper variant="outlined" > 
                     <ViewReport />
                  </Paper>
                </Box>
              </Grid>
              {/* <Grid item xs={6}>
                <Box
                  sx={{
                    display: "flex",
                    "& > :not(style)": {
                      m: 1,
                      width: '100%',

                      height: 128,
                    },
                  }}
                >
                   <Paper variant="outlined" > 
                     <ViewTransactions />
                  </Paper>
                </Box>
              </Grid> */}
            </Grid>
          </CardContent>
        </CardWrapper>
      )}

    
    </>
  );
};

export default ToolDarkCard;
