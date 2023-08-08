import { AppDispatch, AppThunk } from "../../types";
import { TIngredient } from "../../types/TIngredient";
import { TOrder } from "../../types/TOrder";
import { OrderService } from "../../services/api/order";
import {
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
} from "../constants/order";
import { clearConstructorAction } from "./burgerConstructor";

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder;
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST,
});

export const getOrderSuccessAction = (order: TOrder): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    order,
});

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED,
});

export type TOrderActions =
    | IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction;


export const getOrder: AppThunk = (ingredients: TIngredient[]) => async (dispatch: AppDispatch) => {
    dispatch(getOrderRequestAction());
    
    try {
        const res = await OrderService.create(ingredients);
        
        if (res && res.success) {
            dispatch(getOrderSuccessAction(res.order));
        } else {
            dispatch(getOrderFailedAction());
        }
        
        dispatch(clearConstructorAction());
    } catch (e) {
        dispatch(getOrderFailedAction());
        
        dispatch(clearConstructorAction());
    }
};