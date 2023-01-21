import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FinaceSlice, Wallet } from "../../../types/main";

const initialState: FinaceSlice = {
  wallet: {
    uid: "",
    total: 0,
    saving: 0,
    cash: 0,
  },
  transactions: [],
  income: 0,
  spending: 0,
};

export const ficaneSlice = createSlice({
  name: "FINACE",
  initialState,
  reducers: {
    setWallet(state, actions : PayloadAction<Wallet>) {
        state.wallet = actions.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setWallet } = ficaneSlice.actions;

export default ficaneSlice.reducer;
