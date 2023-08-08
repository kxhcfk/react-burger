import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
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

export type TApplicationActions =
    | TIngredientsActions
    | TAuthActions
    | TIngredientActions
    | TOrderActions
    | TGetAllOrdersActions
    | TCurrentOrderActions
    | TGetUserOrdersActions
    | TBurgerConstructorActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;