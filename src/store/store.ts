import {
    TypedUseSelectorHook,
    useSelector as selectorHook,
    useDispatch as dispatchHook,
} from "react-redux";
import {
    applyMiddleware,
    createStore,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { AppDispatch, AppThunk, RootState } from "../types";
import { allOrdersTypes, userOrdersTypes } from "./middlewares/types";
import { wsMiddleware } from "./middlewares/wsMiddleware";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    composeWithDevTools(
    applyMiddleware(
        thunk,
        wsMiddleware(allOrdersTypes),
        wsMiddleware(userOrdersTypes),
    ))
);

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// @ts-ignore
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export { store };