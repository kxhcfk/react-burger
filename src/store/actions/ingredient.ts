import { TIngredient } from "../../types/TIngredient";
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../constants/ingredient";

export interface ISetIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly currentIngredient: TIngredient | undefined;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_CURRENT_INGREDIENT;
}

export const setIngredientAction = (ingredient: TIngredient | undefined): ISetIngredientAction => ({
    type: SET_CURRENT_INGREDIENT,
    currentIngredient: ingredient
});

export const deleteIngredientAction = (): IDeleteIngredientAction => ({
    type: DELETE_CURRENT_INGREDIENT,
});

export type TIngredientActions =
    | ISetIngredientAction
    | IDeleteIngredientAction;