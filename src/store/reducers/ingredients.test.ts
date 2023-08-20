import {ingredientsReducer as reducer, initialState as state} from "./ingredients";
import {
    getIngredientsFailedAction,
    getIngredientsRequestAction,
    getIngredientsSuccessAction,
} from "../actions/ingredients";
import { ingredientTest } from "../../utils/constatns";

describe("Ingredients reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state)
    })
    it("should handle GET_INGREDIENTS_REQUEST", () => {
        expect(reducer(state, getIngredientsRequestAction())).toEqual({
            ...state,
            ingredientsRequest: true,
            ingredientsFailed: false,
        })
    })
    it("should handle GET_INGREDIENTS_SUCCESS", () => {
        expect(reducer(state, getIngredientsSuccessAction([ingredientTest, ingredientTest]))).toEqual({
            ...state,
            ingredientsRequest: false,
            ingredients: [ingredientTest, ingredientTest],
        })
    })
    it("should handle GET_INGREDIENTS_FAILED", () => {
        expect(reducer(state, getIngredientsFailedAction())).toEqual({
            ...state,
            ingredientsRequest: false,
            ingredientsFailed: true,
        })
    })
})