import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from '../actions/order';

const initialState = {
	order: null,
	orderRequest: false,
	orderFailed: false,
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDER_REQUEST: {
			return {
				...state,
				orderRequest: true,
				orderFailed: false,
			};
		}
		case GET_ORDER_SUCCESS: {
			return {
				...state,
				orderRequest: false,
				order: action.payload,
			};
		}
		case GET_ORDER_FAILED: {
			return {
				...state,
				orderRequest: false,
				orderFailed: true,
			}
		}
		default: {
			return state;
		}
	}
};

export { orderReducer };