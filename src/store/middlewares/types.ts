import {
    getAllOrders, getAllOrdersDisconnect,
    getAllOrdersError,
    getAllOrdersSuccess,
} from "../actions/wsAllOrders";
import {
    getUserOrders, getUserOrdersDisconnect,
    getUserOrdersError,
    getUserOrdersSuccess,
} from "../actions/wsUserOrders";
import {
    WS_CONNECTION_ALL_ORDERS_START,
    WS_CONNECTION_ALL_ORDERS_STOP,
} from "../constants/wsAllOrders";
import {
    WS_CONNECTION_USER_ORDERS_START,
    WS_CONNECTION_USER_ORDERS_STOP,
} from "../constants/wsUserOrders";

export const allOrdersTypes = {
    wsStart: WS_CONNECTION_ALL_ORDERS_START,
    wsStop: WS_CONNECTION_ALL_ORDERS_STOP,
    
    onOpen: getAllOrdersSuccess,
    onMessage: getAllOrders,
    onError: getAllOrdersError,
    onClose: getAllOrdersDisconnect,
}

export const userOrdersTypes = {
    wsStart: WS_CONNECTION_USER_ORDERS_START,
    wsStop: WS_CONNECTION_USER_ORDERS_STOP,
    
    onOpen: getUserOrdersSuccess,
    onMessage: getUserOrders,
    onError: getUserOrdersError,
    onClose: getUserOrdersDisconnect,
}