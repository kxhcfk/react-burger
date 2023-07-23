import { TIngredient } from "../../types/TIngredient";
import { OrderService } from '../api/order';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';

// @ts-ignore
export const getOrder = (ingredients: TIngredient[]) => async (dispatch) => {
	dispatch({ type: GET_ORDER_REQUEST });
	
	try {
		const res = await OrderService.create(ingredients);
		
		if (res && res.success) {
			dispatch({ type: GET_ORDER_SUCCESS, payload: res.order });
		} else {
			dispatch({ type: GET_ORDER_FAILED });
		}
	} catch (e) {
		dispatch({ type: GET_ORDER_FAILED });
	}
};