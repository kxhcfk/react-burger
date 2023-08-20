import { TWsOrder, TWsOrderMessage } from "../../types/TOrder";
import {
    WS_CONNECTION__USER_ORDERS_CLOSED,
    WS_CONNECTION__USER_ORDERS_ERROR,
    WS_CONNECTION__USER_ORDERS_SUCCESS,
    WS_CONNECTION_USER_ORDERS_START,
    WS_CONNECTION_USER_ORDERS_STOP,
    WS_GET_USER_ORDERS,
} from "../constants/wsUserOrders";

export interface IGetUserOrdersConnect {
    type: typeof WS_CONNECTION_USER_ORDERS_START;
    payload: string;
}

export interface ICloseUserOrdersConnect {
    type: typeof WS_CONNECTION_USER_ORDERS_STOP,
}

export interface IGetUserOrdersSuccess {
    type: typeof WS_CONNECTION__USER_ORDERS_SUCCESS;
}

export interface IGetUserOrdersError {
    type: typeof WS_CONNECTION__USER_ORDERS_ERROR;
}

export interface IGetUserOrdersDisconnect {
    type: typeof WS_CONNECTION__USER_ORDERS_CLOSED;
}

export interface IGetUserOrders {
    type: typeof WS_GET_USER_ORDERS,
    payload: {
        orders: Array<TWsOrder>
        total: number,
        totalToday: number
    }
}

export type TGetUserOrdersActions =
    | IGetUserOrdersConnect
    | ICloseUserOrdersConnect
    | IGetUserOrdersSuccess
    | IGetUserOrdersError
    | IGetUserOrdersDisconnect
    | IGetUserOrders;

export const getUserOrdersConnect = (
    url: string,
): IGetUserOrdersConnect => ({
    type: WS_CONNECTION_USER_ORDERS_START,
    payload: url,
});

export const getUserOrdersSuccess = (): IGetUserOrdersSuccess => ({
    type: WS_CONNECTION__USER_ORDERS_SUCCESS,
});

export const getUserOrdersError = (): IGetUserOrdersError => ({
    type: WS_CONNECTION__USER_ORDERS_ERROR,
});

export const getUserOrdersDisconnect = (): IGetUserOrdersDisconnect => ({
    type: WS_CONNECTION__USER_ORDERS_CLOSED,
});

export const closeUserOrders = (): ICloseUserOrdersConnect => ({
    type: WS_CONNECTION_USER_ORDERS_STOP,
});

export const getUserOrders = (
    data: TWsOrderMessage,
): IGetUserOrders => {
    return {
        type: WS_GET_USER_ORDERS,
        payload: {
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday,
        },
    };
};