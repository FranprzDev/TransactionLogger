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
    editTransacation(state, action) {
      const { id, description, amount, type, category, date } = action.payload;

      const index = state.transaction.findIndex((transaction) => transaction.id === id);

      state.transaction[index] = {
        id,
        description,
        amount,
        type,
        category,
        date,
      };

      localStorage.setItem("transaction", JSON.stringify(state.transaction));
    },
    deleteTransaction(state, action) {
      const id = action.payload
    
      state.transaction = state.transaction.filter((transaction) => transaction.id !== id);

      localStorage.setItem("transaction", JSON.stringify(state.transaction));
    }
  },
});

export const { addTransaction, editTransacation, deleteTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;