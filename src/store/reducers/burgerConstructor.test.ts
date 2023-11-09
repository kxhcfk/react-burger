import { burgerConstructorReducer as reducer, initialState as state } from "./burgerConstructor";
import {
    addConstructorBunAction, addConstructorIngredientAction,
    calcTotalPriceAction,
    clearConstructorAction,
    deleteConstructorIngredientAction,
} from "../actions/burgerConstructor";
import { ingredientTest } from "../../utils/constatns";

describe("Burger constructor reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
    });
    it("should handle ADD_CONSTRUCTOR_BUN", () => {
        expect(reducer(state, addConstructorBunAction(ingredientTest))).toEqual({
            ...state,
            bun: ingredientTest,
        });
    });
    it("should handle ADD_CONSTRUCTOR_INGREDIENT", () => {
        expect(reducer(state, addConstructorIngredientAction({...ingredientTest, uuid: "test"}))).toEqual({
            ...state,
            constructorIngredients: [
                ...state.constructorIngredients,
                {...ingredientTest, uuid: "test"},
            ],
        });
    });
    it("should handle DELETE_CONSTRUCTOR_INGREDIENT", () => {
        expect(reducer({
            ...state,
            constructorIngredients: [{ ...ingredientTest, uuid: "daopsfpoasdjffkd" }],
        }, deleteConstructorIngredientAction("daopsfpoasdjffkd"))).toEqual({
            ...state,
            constructorIngredients: [],
        });
    });
    it("should handle CLEAR_CONSTRUCTOR", () => {
        expect(reducer({
            ...state,
            constructorIngredients: [{ ...ingredientTest, uuid: "123" }],
        }, clearConstructorAction())).toEqual(state);
    });
    it("should handle CALC_TOTAL_PRICE", () => {
        expect(reducer({
            ...state,
            bun: ingredientTest,
            constructorIngredients: [{ ...ingredientTest, uuid: "123" }],
        }, calcTotalPriceAction())).toEqual({
            ...state,
            bun: ingredientTest,
            constructorIngredients: [{ ...ingredientTest, uuid: "123" }],
            totalPrice: (988 + 988 * 2),
        });
    });
});