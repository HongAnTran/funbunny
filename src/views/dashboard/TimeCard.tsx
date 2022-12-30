import React , { useEffect , useState } from "react";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Stack, Typography } from "@mui/material";
import Moment from 'react-moment';
// project imports
import MainCard from "../../ui-component/cards/MainCard";
import TotalIncomeCard from "../../ui-component/cards/Skeleton/TotalIncomeCard";
import  { useTranslation } from "react-i18next"

const CardWrapper = styled(MainCard)(({ theme }: { theme: any }) => ({
  //   backgroundColor: theme.palette.primary.dark,
  //   color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
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

const TimeCard = ({ isLoading }: { isLoading: boolean }) => {
  const theme: any = useTheme();
  const { t } = useTranslation()
   const [time , setTime ] = useState<number>(new Date().getTime()) 
   const [timePresix , setTimePresix ] = useState<'AM' | 'PM' >('AM') 

  useEffect(()=>{
   const interval = setInterval(()=>{
        const date = new Date()
         date.getHours()>= 12 ? setTimePresix('PM') : setTimePresix('AM');
        setTime(date.getTime())     
    },1000)

    return ()=>{
        clearInterval(interval)
    }
  },[])
  
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"

              justifyContent="space-between"
            >
                <Button variant="contained" color="secondary" 
                    sx={{
            
                        cursor:"default"
                    }}
                >
              <Typography variant="h4" sx={{color:"white"}}>
                <Moment  format="hh:mm" >
                        {time}
                </Moment>
                <span  style={{marginLeft:4}} >{timePresix}</span>
              </Typography>
                </Button>

              <Typography variant="h3" gutterBottom
              sx={{
                color:theme.palette.primary.dark
             
            }}
              >
                {t('navbar.dashboard')}
              </Typography>
            </Stack>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TimeCard;
