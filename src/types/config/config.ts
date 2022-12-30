import { PaletteMode } from '@mui/material' 

export interface Config {
    basename:string;
    defaultPath:string;
    fontFamily:`'Roboto', sans-serif` | `'Poppins', sans-serif` | `'Inter', sans-serif`;
    borderRadius: number;
    i18n:'en' | 'vi' | string;
    i18nDefault:'en' | 'vi'
    mode:PaletteMode | string;
}

export interface Languages {
    name: string,
    value: 'en' | 'vi'
}