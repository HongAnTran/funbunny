import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import SpendingCard from './SpendingCard';
import TransactionsViewCard from './TransactionsViewCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
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
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <SpendingCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TimeCard isLoading={isLoading}/>
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <WalletCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TransactionsViewCard />
                    </Grid>
                    <Grid item xs={12} md={4}>
                         <ToolDarkCard  isLoading={isLoading}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
