import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // Không được có router reducer ở đây
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});