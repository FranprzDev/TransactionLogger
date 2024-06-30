import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transaction: JSON.parse(localStorage.getItem("transaction")) || [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction(state, action) {
      state.transaction.push(action.payload);

      localStorage.setItem("transaction", JSON.stringify(state.transaction));
    },
  },
});

export const { addTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;