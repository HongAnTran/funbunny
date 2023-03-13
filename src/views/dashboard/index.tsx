import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import SpendingCard from './SpendingCard';
import TransactionsViewCard from './TransactionsViewCard';
import IncomCard from './IncomCard';
import WalletCard from './WalletCard';
import { gridSpacing } from '../../constans/constant';
import TimeCard from './TimeCard';
import ToolDarkCard from './ToolDarkCard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
            setLoading(false);
    }, []);

    return (
        <div style={{height: '100%' , display: 'flex' , flexDirection: 'column'}}>
            <Grid item xs={12} sx={{mb:3}}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <SpendingCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <IncomCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TimeCard isLoading={isLoading}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <WalletCard isLoadingBig={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid   item xs={12} style={{flex:1}}>
                <Grid container spacing={gridSpacing} style={{height: '100%'}}>
                    <Grid item xs={12} md={8} order={{ xs: 3, sm: 3 , md: 3 , lg : 2}}>
                        <TransactionsViewCard />
                    </Grid>
                    <Grid item xs={12} md={4} order={{ xs: 2, sm: 2  , md : 2 , lg: 3}} >
                         <ToolDarkCard  isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
