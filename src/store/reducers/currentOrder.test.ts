import { currentOrderReducer as reducer, initialState as state } from "./currentOrder";
import {
    getCurrentOrderFailedAction,
    getCurrentOrderRequestAction,
    getCurrentOrderSuccessAction,
} from "../actions/currentOrder";
import { wsOrderTest } from "../../utils/constatns";

describe("Current order reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
    });
    it("should handle GET_CURRENT_ORDER_REQUEST", () => {
        expect(reducer(state, getCurrentOrderRequestAction())).toEqual({
            ...state,
            currentOrderRequest: true,
        });
    });
    it("should handle GET_CURRENT_ORDER_SUCCESS", () => {
        expect(reducer(state, getCurrentOrderSuccessAction(wsOrderTest))).toEqual({
            ...state,
            currentOrderRequest: false,
            currentOrder: wsOrderTest,
        });
    });
    it("should handle GET_CURRENT_ORDER_FAILED", () => {
        expect(reducer(state, getCurrentOrderFailedAction())).toEqual({
            ...state,
            currentOrderRequest: false,
            currentOrderFailed: true,
        });
    });
});