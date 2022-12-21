import { createTheme } from '@mui/material/styles';

// assets
import colors from '../assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export const theme = (customization) => {
    const color = colors;
    let themeOption 
    if(customization.mode === 'light'){
        themeOption =  {
            colors: color,
            heading: color.grey900,
            paper: color.paper,
            backgroundDefault: color.paper,
            background: color.primaryLight,
            darkTextPrimary: color.grey700,
            darkTextSecondary: color.grey500,
            textDark: color.grey900,
            
            menuSelected: color.secondaryDark,
            menuSelectedBack: color.secondaryLight,
            divider: color.grey200,
            customization
        };

    }else{
        themeOption =  {
            colors: color,
            heading: color.darkTextTitle,
            paper:color.darkLevel2,
            backgroundDefault: color.darkPaper,
            background: color.darkBackground,
            darkTextPrimary: color.darkTextPrimary,
            darkTextSecondary:color.darkTextSecondary,
            textDark: color.grey50,
            menuSelected: color.secondaryLight,
            menuSelectedBack: color.secondaryDark,
            divider: color.darkTextPrimary,
            customization
        };
    }

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1920
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;
