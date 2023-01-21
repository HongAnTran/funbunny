import { PaletteMode } from '@mui/material' 

type FontFamily = `'Roboto', sans-serif` | `'Poppins', sans-serif` | `'Inter', sans-serif`
type Lang  = 'en' | 'vi' | string;

export interface Config {
    basename:string;
    defaultPath:string;
    fontFamily: FontFamily;
    borderRadius: number;
    i18n:Lang;
    i18nDefault:'en' | 'vi'
    mode:PaletteMode | string;
}

export interface Languages {
    name: string,
    value: 'en' | 'vi'
}

export interface CustomState {
    isOpen :string[];
    fontFamily:FontFamily;
    borderRadius:number;
    opened:boolean;
    mode:PaletteMode  | string;
    lang:Lang;
}