import { IngredientsService } from '../api/ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

// @ts-ignore
export const getIngredients = () => async (dispatch) => {
	dispatch({ type: GET_INGREDIENTS_REQUEST });
	
	try {
		const res = await IngredientsService.get();
		
		if (res && res.success) {
			dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data });
		} else {
			dispatch({ type: GET_INGREDIENTS_FAILED });
		}
	} catch (e) {
		dispatch({ type: GET_INGREDIENTS_FAILED });
	}
};