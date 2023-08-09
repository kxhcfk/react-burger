import { TypedUseSelectorHook } from "react-redux";
import { useDispatch as dispatchHook } from "react-redux/es/hooks/useDispatch";
import { useSelector as selectorHook } from "react-redux/es/hooks/useSelector";
import { Action, ActionCreator } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TAuthActions } from "../store/actions/auth";
import {
    TBurgerConstructorActions,
} from "../store/actions/burgerConstructor";
import { TCurrentOrderActions } from "../store/actions/currentOrder";
import { TIngredientActions } from "../store/actions/ingredient";
import { TIngredientsActions } from "../store/actions/ingredients";
import { TOrderActions } from "../store/actions/order";
import { TGetAllOrdersActions } from "../store/actions/wsAllOrders";
import { TGetUserOrdersActions } from "../store/actions/wsUserOrders";
import { store } from "../store/store";
import type {} from 'redux-thunk/extend-redux'

export type TApplicationActions =
    | TIngredientsActions
    | TIngredientActions
    | TBurgerConstructorActions
    | TOrderActions
    | TAuthActions
    | TCurrentOrderActions
    | TGetAllOrdersActions
    | TGetUserOrdersActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;

export type AppDispatch<ReturnType = void> = (action: TApplicationActions | AppThunk<ReturnType>) => ReturnType;

