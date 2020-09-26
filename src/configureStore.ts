import { applyMiddleware, createStore, Store } from "redux";
import { ApplicationState, createRootReducer } from "./store";
import { websocketMiddleware } from "./store/middleware";

//他定義を用いてstoreを作成
const configureStore = (
  initialState: ApplicationState
): Store<ApplicationState> => {
  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(websocketMiddleware)
  );
  return store;
};

export default configureStore;
