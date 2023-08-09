import { TIngredient } from "../../types/TIngredient";
import { TIngredientActions } from "../actions/ingredient";
import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from "../constants/ingredient";

type TIngredientState = {
	currentIngredient: TIngredient | undefined;
}

const initialState: TIngredientState = {
	currentIngredient: undefined,
};

const ingredientReducer = (state: TIngredientState = initialState, action: TIngredientActions): TIngredientState => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT: {
			return {
				...state,
				currentIngredient: action.currentIngredient,
			};
		}
		case DELETE_CURRENT_INGREDIENT: {
			return {
				...state,
				currentIngredient: undefined,
			};
		}
		default: {
			return state;
		}
	}
};

export { ingredientReducer };