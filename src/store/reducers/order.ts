import { TOrder } from "../../types/TOrder";
import { TOrderActions } from "../actions/order";
import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "../constants/order";

type TOrderState = {
	order: TOrder | null;
	orderRequest: boolean;
	orderFailed: boolean;
};

export const initialState: TOrderState = {
	order: null,
	orderRequest: false,
	orderFailed: false,
};

const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
				order: action.order,
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