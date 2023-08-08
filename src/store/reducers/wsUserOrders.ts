import { TWsOrder } from "../../types/TOrder";
import { TGetAllOrdersActions } from "../actions/wsAllOrders";
import { TGetUserOrdersActions } from "../actions/wsUserOrders";
import {
} from "../constants/wsAllOrders";
import {
    WS_CONNECTION__USER_ORDERS_CLOSED,
    WS_CONNECTION__USER_ORDERS_ERROR,
    WS_CONNECTION__USER_ORDERS_SUCCESS, WS_GET_USER_ORDERS,
} from "../constants/wsUserOrders";

interface IGetUserOrdersState {
    wsConnected: boolean,
    orders: Array<TWsOrder>,
    total: number,
    totalToday: number,
}

const initialState: IGetUserOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const wsReducerGetUserOrders = (state = initialState, action: TGetUserOrdersActions): IGetUserOrdersState => {
    switch (action.type) {
        case WS_CONNECTION__USER_ORDERS_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };
        
        case WS_CONNECTION__USER_ORDERS_ERROR:
            return {
                ...state,
                wsConnected: false,
            };
        
        case WS_CONNECTION__USER_ORDERS_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };
        
        case WS_GET_USER_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };
        
        default:
            return state;
    }
};