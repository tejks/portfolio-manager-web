import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum TransactionType {
  BUY = "buy",
  SELL = "sell",
}

export interface TransactionData {
  id: number;
  broker: string;
  address: string;
  date: string;
  type: TransactionType;
  amount: number;
  price: number;
}

export type TransactionState = {
  data: TransactionData[];
};

const initialState: TransactionState = {
  data: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.data = action.payload;
    },
    addTransaction: (state, action: PayloadAction<TransactionData>) => {
      state.data.push(action.payload);
    },
    removeTransaction: (state, action) => {
      state.data = state.data.filter((transaction) => transaction.id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, removeTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
