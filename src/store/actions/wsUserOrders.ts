import { TWsOrder } from "../../types/TOrder";
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
    payload: Event;
}

export interface IGetUserOrdersError {
    type: typeof WS_CONNECTION__USER_ORDERS_ERROR;
    payload: Event;
}

export interface IGetUserOrdersDisconnect {
    type: typeof WS_CONNECTION__USER_ORDERS_CLOSED;
    payload: Event;
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

export const getUserOrdersSuccess = (
    event: Event,
): IGetUserOrdersSuccess => ({
    type: WS_CONNECTION__USER_ORDERS_SUCCESS,
    payload: event,
});

export const getUserOrdersError = (
    event: Event,
): IGetUserOrdersError => ({
    type: WS_CONNECTION__USER_ORDERS_ERROR,
    payload: event,
});

export const getUserOrdersDisconnect = (
    event: Event,
): IGetUserOrdersDisconnect => ({
    type: WS_CONNECTION__USER_ORDERS_CLOSED,
    payload: event,
});

export const closeUserOrders = (): ICloseUserOrdersConnect => ({
    type: WS_CONNECTION_USER_ORDERS_STOP,
});

export const getUserOrders = (
    event: MessageEvent,
): IGetUserOrders => {
    const data = JSON.parse(event.data);
    return {
        type: WS_GET_USER_ORDERS,
        payload: {
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday,
        },
    };
};