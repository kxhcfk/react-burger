import {ingredientReducer as reducer, initialState as state} from "./ingredient";
import { deleteIngredientAction, setIngredientAction } from "../actions/ingredient";
import { ingredientTest } from "../../utils/constatns";

describe("Ingredient reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state)
    })
    it("should handle SET_CURRENT_INGREDIENT", () => {
        expect(reducer(state, setIngredientAction(ingredientTest))).toEqual({
            ...state,
            currentIngredient: ingredientTest
        })
    })
    it("should handle DELETE_CURRENT_INGREDIENT", () => {
        expect(reducer(state, deleteIngredientAction())).toEqual({
            ...state,
            currentIngredient: undefined
        })
    })
})