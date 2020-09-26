import { combineReducers } from "redux";
import { AppState } from "../types/store";
import { reducer } from "./reducer";

export interface ApplicationState {
  app: AppState;
}

export const createRootReducer = () =>
  combineReducers({
    app: reducer,
  });
