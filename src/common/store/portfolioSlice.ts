import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PortfolioState = {
  data: [
    {
      address: "rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof",
      currentPrice: 120,
      targetShare: 0.2,
      data: [
        {
          broker: "Binance",
          amount: 5,
          avgPrice: 100,
        },
        {
          broker: "Kraken",
          amount: 5,
          avgPrice: 140,
        },
      ],
    },
    {
      address: "So11111111111111111111111111111111111111112",
      currentPrice: 600,
      targetShare: 0.2,
      data: [
        {
          broker: "Binance",
          amount: 5,
          avgPrice: 500,
        },
        {
          broker: "Kraken",
          amount: 5,
          avgPrice: 700,
        },
      ],
    },
    {
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      currentPrice: 1,
      targetShare: 0.2,
      data: [
        {
          broker: "Binance",
          amount: 5,
          avgPrice: 1,
        },
        {
          broker: "Kraken",
          amount: 5,
          avgPrice: 2,
        },
      ],
    },
    {
      address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
      currentPrice: 16,
      targetShare: 0.2,
      data: [
        {
          broker: "Binance",
          amount: 5,
          avgPrice: 10,
        },
        {
          broker: "Kraken",
          amount: 5,
          avgPrice: 20,
        },
      ],
    },
  ],
};

export type PortfolioData = {
  address: string;
  currentPrice: number;
  targetShare: number;
  data: { broker: string; amount: number; avgPrice: number }[];
};

export interface PortfolioState {
  data: PortfolioData[];
}

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setPortfolio: (state, action) => {
      state.data = action.payload;
    },
    addAsset: (state, action: PayloadAction<PortfolioData>) => {
      state.data.push(action.payload);
    },
    removeAsset: (state, action) => {
      state.data = state.data.filter((asset) => asset.address !== action.payload);
    },
    updateAsset: (state, action) => {
      const assetIndex = state.data.findIndex((asset) => asset.address === action.payload.address);
      state.data[assetIndex] = action.payload;
    },
    clearPortfolio: (state) => {
      state.data = [];
    },
  },
});

export const { setPortfolio, addAsset, removeAsset, updateAsset, clearPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;
