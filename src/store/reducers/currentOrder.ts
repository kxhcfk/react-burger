import { TWsOrder } from "../../types/TOrder";
import { TCurrentOrderActions } from "../actions/currentOrder";
import {
    GET_CURRENT_ORDER_FAILED,
    GET_CURRENT_ORDER_REQUEST,
    GET_CURRENT_ORDER_SUCCESS,
} from "../constants/currentOrder";

type TCurrentOrderState = {
    currentOrder: TWsOrder | null;
    currentOrderRequest: boolean;
    currentOrderFailed: boolean;
}

export const initialState: TCurrentOrderState = {
    currentOrder: null,
    currentOrderRequest: false,
    currentOrderFailed: false,
};

export const currentOrderReducer = (state: TCurrentOrderState = initialState, action: TCurrentOrderActions): TCurrentOrderState => {
    switch (action.type) {
        case GET_CURRENT_ORDER_REQUEST: {
            return {
                ...initialState,
                currentOrderRequest: true,
            }
        }
        case GET_CURRENT_ORDER_SUCCESS: {
            return {
                ...state,
                currentOrderRequest: false,
                currentOrder: action.order
            }
        }
        case GET_CURRENT_ORDER_FAILED: {
            return {
                ...state,
                currentOrderRequest: false,
                currentOrderFailed: true,
            }
        }
        default: {
            return state;
        }
    }
}