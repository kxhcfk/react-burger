import { TWsOrder, TWsOrderMessage } from "../../types/TOrder";
import {
    WS_CONNECTION__ALL_ORDERS_CLOSED,
    WS_CONNECTION__ALL_ORDERS_ERROR,
    WS_CONNECTION__ALL_ORDERS_SUCCESS,
    WS_CONNECTION_ALL_ORDERS_START,
    WS_CONNECTION_ALL_ORDERS_STOP, WS_GET_ALL_ORDERS,
} from "../constants/wsAllOrders";

export interface IGetAllOrdersConnect {
    type: typeof WS_CONNECTION_ALL_ORDERS_START;
    payload: string;
}

export interface ICloseAllOrdersConnect {
    type: typeof WS_CONNECTION_ALL_ORDERS_STOP,
    
}

export interface IGetAllOrdersSuccess {
    type: typeof WS_CONNECTION__ALL_ORDERS_SUCCESS;
}

export interface IGetAllOrdersError {
    type: typeof WS_CONNECTION__ALL_ORDERS_ERROR;
}

export interface IGetAllOrdersDisconnect {
    type: typeof WS_CONNECTION__ALL_ORDERS_CLOSED;
}

export interface IGetAllOrders {
    type: typeof WS_GET_ALL_ORDERS,
    payload: {
        orders: Array<TWsOrder>
        total: number,
        totalToday: number
    }
}

export type TGetAllOrdersActions =
    | IGetAllOrdersConnect
    | ICloseAllOrdersConnect
    | IGetAllOrdersSuccess
    | IGetAllOrdersError
    | IGetAllOrdersDisconnect
    | IGetAllOrders

export const getAllOrdersConnect = (
    url: string,
): IGetAllOrdersConnect => ({
    type: WS_CONNECTION_ALL_ORDERS_START,
    payload: url,
});

export const getAllOrdersSuccess = (): IGetAllOrdersSuccess => ({
    type: WS_CONNECTION__ALL_ORDERS_SUCCESS,
});

export const getAllOrdersError = (): IGetAllOrdersError => ({
    type: WS_CONNECTION__ALL_ORDERS_ERROR,
});

export const getAllOrdersDisconnect = (): IGetAllOrdersDisconnect => ({
    type: WS_CONNECTION__ALL_ORDERS_CLOSED,
});

export const closeAllOrders = (): ICloseAllOrdersConnect => ({
    type: WS_CONNECTION_ALL_ORDERS_STOP,
});

export const getAllOrders = (
    data: TWsOrderMessage,
): IGetAllOrders => {
    return {
        type: WS_GET_ALL_ORDERS,
        payload: {
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday,
        },
    };
};