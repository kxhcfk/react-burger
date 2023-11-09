import { TWsOrder } from "../../types/TOrder";
import { TGetAllOrdersActions } from "../actions/wsAllOrders";
import {
    WS_CONNECTION__ALL_ORDERS_CLOSED,
    WS_CONNECTION__ALL_ORDERS_ERROR,
    WS_CONNECTION__ALL_ORDERS_SUCCESS, WS_GET_ALL_ORDERS,
} from "../constants/wsAllOrders";

interface IGetAllOrdersState {
    wsConnected: boolean,
    orders: Array<TWsOrder>,
    total: number,
    totalToday: number,
}

export const initialState: IGetAllOrdersState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const wsReducerGetAllOrders = (state = initialState, action: TGetAllOrdersActions): IGetAllOrdersState => {
    switch (action.type) {
        case WS_CONNECTION__ALL_ORDERS_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };
        
        case WS_CONNECTION__ALL_ORDERS_ERROR:
            return {
                ...state,
                wsConnected: false,
            };
        
        case WS_CONNECTION__ALL_ORDERS_CLOSED:
            return {
                ...state,
                wsConnected: false,
            };
        
        case WS_GET_ALL_ORDERS:
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