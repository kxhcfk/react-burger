import {
	GET_INGREDIENTS_FAILED,
	GET_INGREDIENTS_REQUEST,
	GET_INGREDIENTS_SUCCESS,
} from '../actions/ingredients';

const initialState = {
	ingredients: [],
	ingredientsRequest: false,
	ingredientsFailed: false,
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_INGREDIENTS_REQUEST: {
			return {
				...state,
				ingredientsRequest: true,
				ingredientsFailed: false,
			};
		}
		case GET_INGREDIENTS_SUCCESS: {
			return {
				...state,
				ingredientsRequest: false,
				ingredients: action.payload,
			};
		}
		case GET_INGREDIENTS_FAILED: {
			return {
				...state,
				ingredientsRequest: false,
				ingredientsFailed: true,
			};
		}
		default: {
			return state;
		}
	}
};

export { ingredientsReducer };