import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from '../actions/ingredient';

const initialState = {
	currentIngredient: null,
};

const currentIngredientReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_INGREDIENT: {
			return {
				...state,
				currentIngredient: action.payload,
			};
		}
		case DELETE_CURRENT_INGREDIENT: {
			return {
				...state,
				currentIngredient: null,
			};
		}
		default: {
			return state;
		}
	}
};

export { currentIngredientReducer };