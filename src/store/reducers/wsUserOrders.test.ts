import {wsReducerGetUserOrders as reducer, initialState as state} from "./wsUserOrders";
import {
    getUserOrders,
    getUserOrdersDisconnect,
    getUserOrdersError,
    getUserOrdersSuccess,
} from "../actions/wsUserOrders";
import { wsOrderMessageTest } from "../../utils/constatns";

describe("Ws user orders reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state)
    })
    it("should handle WS_CONNECTION__USER_ORDERS_SUCCESS", () => {
        expect(reducer(state, getUserOrdersSuccess())).toEqual({
            ...state,
            wsConnected: true,
        })
    })
    it("should handle WS_CONNECTION__USER_ORDERS_ERROR", () => {
        expect(reducer(state, getUserOrdersError())).toEqual({
            ...state,
            wsConnected: false,
        })
    })
    it("should handle WS_CONNECTION__USER_ORDERS_CLOSED", () => {
        expect(reducer(state, getUserOrdersDisconnect())).toEqual({
            ...state,
            wsConnected: false,
        })
    })
    
    it("should handle WS_GET_USER_ORDERS", () => {
        expect(reducer(state, getUserOrders(wsOrderMessageTest))).toEqual({
            ...state,
            ...wsOrderMessageTest
        })
    })
})