import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import type { RootState } from './redux/store'
// routing
import routes from  './routes';

// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
// defaultTheme
import themes from './themes';

// project imports
// import NavigationScroll from './layout/NavigationScroll';
import { RouterProvider } from 'react-router-dom';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state : RootState) => state.custom);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                    <RouterProvider router={routes()} />
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
