import { AppDispatch, AppThunk } from "../../types";
import { TIngredient } from "../../types/TIngredient";
import { IngredientsService } from "../../services/api/ingredients";
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from "../constants/ingredients";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (ingredients: TIngredient[]): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients,
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED,
});

export type TIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;


export const getIngredients = () => async (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction());
    
    try {
        const res = await IngredientsService.get();
        
        if (res && res.success) {
            dispatch(getIngredientsSuccessAction(res.data));
        } else {
            dispatch(getIngredientsFailedAction());
        }
    } catch (e) {
        dispatch(getIngredientsFailedAction());
    }
};