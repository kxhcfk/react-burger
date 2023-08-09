import { IngredientsService } from "../../services/api/ingredients";
import { OrderService } from "../../services/api/order";
import { AppDispatch, AppThunk } from "../../types";
import { TWsOrder } from "../../types/TOrder";
import {
    GET_CURRENT_ORDER_FAILED,
    GET_CURRENT_ORDER_REQUEST,
    GET_CURRENT_ORDER_SUCCESS,
} from "../constants/currentOrder";
import {
    getIngredientsFailedAction,
    getIngredientsRequestAction,
    getIngredientsSuccessAction,
} from "./ingredients";

export interface IGetCurrentOrderRequestAction {
    readonly type: typeof GET_CURRENT_ORDER_REQUEST;
}

export interface IGetCurrentOrderSuccessAction {
    readonly type: typeof GET_CURRENT_ORDER_SUCCESS;
    readonly order: TWsOrder;
}

export interface IGetCurrentOrderFailedAction {
    readonly type: typeof GET_CURRENT_ORDER_FAILED;
}

export type TCurrentOrderActions = 
    | IGetCurrentOrderRequestAction
    | IGetCurrentOrderSuccessAction
    | IGetCurrentOrderFailedAction;

export const getCurrentOrderRequestAction = (): IGetCurrentOrderRequestAction => ({ type: GET_CURRENT_ORDER_REQUEST });
export const getCurrentOrderSuccessAction = (
    order: TWsOrder
): IGetCurrentOrderSuccessAction => ({ 
    type: GET_CURRENT_ORDER_SUCCESS,
    order
});
export const getCurrentOrderFailedAction = (): IGetCurrentOrderFailedAction => ({ type: GET_CURRENT_ORDER_FAILED });

export const getCurrentOrder = (number: number | string) => async (dispatch: AppDispatch) => {
    dispatch(getCurrentOrderRequestAction());
    
    try {
        const res = await OrderService.get(Number(number));
        
        if (res && res.success) {
            dispatch(getCurrentOrderSuccessAction(res.orders[0]));
        } else {
            dispatch(getCurrentOrderFailedAction());
        }
    } catch (e) {
        dispatch(getCurrentOrderFailedAction());
    }
};