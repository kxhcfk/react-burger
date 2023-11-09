import { TIngredient, TIngredientWithUuid } from "../../types/TIngredient";
import {
    ADD_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_INGREDIENT,
    CALC_TOTAL_PRICE,
    CLEAR_CONSTRUCTOR,
    DELETE_CONSTRUCTOR_INGREDIENT,
    SORT_CONSTRUCTOR_INGREDIENT,
} from "../constants/burgerConstructor";

export interface IAddConstructorBunAction {
    readonly type: typeof ADD_CONSTRUCTOR_BUN;
    readonly bun: TIngredient;
}

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly ingredient: TIngredientWithUuid;
}

export interface IDeleteConstructorIngredientAction {
    readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
    uuid: string;
}

export interface ISortConstructorIngredientAction {
    readonly type: typeof SORT_CONSTRUCTOR_INGREDIENT;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface ICalcTotalPriceAction {
    readonly type: typeof CALC_TOTAL_PRICE;
}

export const addConstructorBunAction = (bun: TIngredient): IAddConstructorBunAction => ({
    type: ADD_CONSTRUCTOR_BUN,
    bun,
});

export const addConstructorIngredientAction = (ingredient: TIngredientWithUuid): IAddConstructorIngredientAction => ({
    type: ADD_CONSTRUCTOR_INGREDIENT,
    ingredient,
});

export const deleteConstructorIngredientAction = (uuid: string): IDeleteConstructorIngredientAction => ({
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    uuid,
});
export const sortConstructorIngredientAction = ({
    dragIndex, hoverIndex
}: {
    dragIndex: number,
    hoverIndex: number
}): ISortConstructorIngredientAction => ({
    type: SORT_CONSTRUCTOR_INGREDIENT,
    dragIndex,
    hoverIndex,
});
export const clearConstructorAction = (): IClearConstructorAction => ({
    type: CLEAR_CONSTRUCTOR
});
export const calcTotalPriceAction = (): ICalcTotalPriceAction => ({
    type: CALC_TOTAL_PRICE
});

export type TBurgerConstructorActions =
    | IAddConstructorBunAction
    | IAddConstructorIngredientAction
    | IDeleteConstructorIngredientAction
    | ISortConstructorIngredientAction
    | IClearConstructorAction
    | ICalcTotalPriceAction;