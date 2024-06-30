import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import transactionSlice from '../slice/transactionSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transaction: transactionSlice,
  },
});
