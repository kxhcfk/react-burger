import {orderReducer as reducer, initialState as state} from "./order";
import {
    getOrderFailedAction,
    getOrderRequestAction,
    getOrderSuccessAction,
} from "../actions/order";

describe("Order reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state)
    })
    it("should handle GET_ORDER_REQUEST", () => {
        expect(reducer(state, getOrderRequestAction())).toEqual({
            ...state,
            orderRequest: true,
            orderFailed: false,
        })
    })
    it("should handle GET_ORDER_SUCCESS", () => {
        expect(reducer(state, getOrderSuccessAction({number: 123}))).toEqual({
            ...state,
            orderRequest: false,
            order: {
                number: 123
            }
        })
    })
    it("should handle GET_ORDER_FAILED", () => {
        expect(reducer(state, getOrderFailedAction())).toEqual({
            ...state,
            orderRequest: false,
            orderFailed: true,
        })
    })
})