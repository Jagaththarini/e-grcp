import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import procurementReducer from "./slices/procurementSlice";
import vendorReducer from "./slices/vendorSlice";
import riskReducer from "./slices/riskSlice";
import complianceReducer from "./slices/complianceSlice";
import auditReducer from "./slices/auditSlice";
import reportReducer from "./slices/reportSlice";
import notificationReducer from "./slices/notificationSlice";
import uiReducer from "./slices/uiSlice";

/* ------------------------- Persist Configurations ------------------------- */

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "user",
    "token",
    "role",
    "isAuthenticated",
  ],
};

const uiPersistConfig = {
  key: "ui",
  storage,
  whitelist: [
    "themeMode",
    "sidebarOpen",
    "sidebarCollapsed",
  ],
};

const procurementPersistConfig = {
  key: "procurement",
  storage,
  whitelist: ["requests"],
};

/* ------------------------------ Root Reducer ------------------------------ */

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),

  dashboard: dashboardReducer,

  procurement: persistReducer(
    procurementPersistConfig,
    procurementReducer
  ),

  vendor: vendorReducer,

  risk: riskReducer,

  compliance: complianceReducer,

  audit: auditReducer,

  report: reportReducer,

  notification: notificationReducer,

  ui: persistReducer(uiPersistConfig, uiReducer),
});

/* ------------------------------ Store ------------------------------ */

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },

      immutableCheck: true,
    }),

  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export default store;