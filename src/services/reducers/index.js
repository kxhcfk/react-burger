import { combineReducers } from 'redux';

import { ingredientsReducer } from './ingredients';
import { currentIngredientReducer } from './currentIngredient';
import { burgerConstructorReducer } from './burgerConstructor';
import { orderReducer } from './order';
import { authReducer } from './auth';

const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	currentIngredient: currentIngredientReducer,
	burgerConstructor: burgerConstructorReducer,
	order: orderReducer,
	auth: authReducer,
});

export { rootReducer };