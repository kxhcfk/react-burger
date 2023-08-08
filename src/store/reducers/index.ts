import { combineReducers } from 'redux';
import { currentOrderReducer } from "./currentOrder";

import { ingredientsReducer } from './ingredients';
import { ingredientReducer } from './ingredient';
import { burgerConstructorReducer } from './burgerConstructor';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { wsReducerGetAllOrders } from "./wsAllOrders";
import { wsReducerGetUserOrders } from "./wsUserOrders";

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	ingredient: ingredientReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
	currentOrder: currentOrderReducer,
	allOrders: wsReducerGetAllOrders,
	userOrders: wsReducerGetUserOrders,
});

export { rootReducer };