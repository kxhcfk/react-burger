import { initialState as state, wsReducerGetAllOrders as reducer } from "./wsAllOrders";
import {
    getAllOrders,
    getAllOrdersDisconnect,
    getAllOrdersError,
    getAllOrdersSuccess,
} from "../actions/wsAllOrders";
import { wsOrderMessageTest } from "../../utils/constatns";

describe("Ws all orders reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
    });
    it("should handle WS_CONNECTION__ALL_ORDERS_SUCCESS", () => {
        expect(reducer(state, getAllOrdersSuccess())).toEqual({
            ...state,
            wsConnected: true,
        });
    });
    it("should handle WS_CONNECTION__ALL_ORDERS_ERROR", () => {
        expect(reducer(state, getAllOrdersError())).toEqual({
            ...state,
            wsConnected: false,
        });
    });
    it("should handle WS_CONNECTION__ALL_ORDERS_CLOSED", () => {
        expect(reducer(state, getAllOrdersDisconnect())).toEqual({
            ...state,
            wsConnected: false,
        });
    });
    
    it("should handle WS_GET_ALL_ORDERS", () => {
        expect(reducer(state, getAllOrders(wsOrderMessageTest))).toEqual({
            ...state,
            ...wsOrderMessageTest,
        });
    });
});