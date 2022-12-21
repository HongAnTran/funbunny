
import { PaletteMode } from '@mui/material' 
import  { KEY_MODE_CONFIG   , KEY_LANG_CONFIG } from './constans/constant'

export interface Languages {
    name: string,
    value: 'en' | 'vi'
}

export const listLanguages :Languages[]  = [
    {
        name: 'English',
        value: 'en'
    },
    {
        name: 'Tiếng việt',
        value: 'vi',
    },
]

export interface Config {
    basename:string;
    defaultPath:string;
    fontFamily:`'Roboto', sans-serif` | `'Poppins', sans-serif` | `'Inter', sans-serif`;
    borderRadius: number;
    i18n:'en' | 'vi' | string;
    mode:PaletteMode | string;
}

const modeLocal : string | 'light'   = JSON.parse(localStorage.getItem(KEY_MODE_CONFIG) || JSON.stringify('light'))  
const langLocal : string | 'vi'   = JSON.parse(localStorage.getItem(KEY_LANG_CONFIG) || JSON.stringify('vi'))


const config : Config = {
    basename: '/',
    defaultPath: 'dashboard',
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 8,
    i18n: langLocal, // 'en' - English, 'vi' - Vietnamese,
    mode:modeLocal,
};

export default config;