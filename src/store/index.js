import { createStore } from "redux";
import { default as applyMiddleware } from "../middleware";
import createReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: 0,
  stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, createReducer());
const store = createStore(persistedReducer, applyMiddleware);
const persistor = persistStore(store);

/**
 * Redux perist purge()
 * @desc purges redux store & async storage
 */
// persistor.purge();

export { store, persistor };
