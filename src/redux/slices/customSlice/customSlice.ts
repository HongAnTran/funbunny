import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PaletteMode } from '@mui/material' 


import  config from '../../../config'
import  { KEY_MODE_CONFIG  } from '../../../constans/constant'
export interface CustomState {
    isOpen :string[];
    fontFamily:`'Roboto', sans-serif` | `'Poppins', sans-serif` | `'Inter', sans-serif`;
    borderRadius:number;
    opened:boolean;
    mode:PaletteMode  | string;
    lang:'en'| 'vi' | string

}

 const initialState:CustomState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    mode: config.mode,
    lang:config.i18n
};


export const customSlice = createSlice({
  name: 'CUSTOM',
  initialState,
  reducers: {
   toogleMode: (state) => {
     state.mode === 'dark' ? state.mode = 'light' : state.mode = 'dark'
     localStorage.setItem(KEY_MODE_CONFIG, JSON.stringify(state.mode))
  },
    setMenu: (state , actions : PayloadAction<boolean>) => {
      state.opened = actions.payload
  },
  setMenuOpen: (state , actions: PayloadAction<string> ) => {
    state.isOpen = [actions.payload]
},
  },
})

// Action creators are generated for each case reducer function
export const { toogleMode  , setMenu  , setMenuOpen } = customSlice.actions

export default customSlice.reducer