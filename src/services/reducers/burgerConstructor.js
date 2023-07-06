import { v4 as uuidv4 } from 'uuid';

import {
	ADD_CONSTRUCTOR_BUN,
	ADD_CONSTRUCTOR_INGREDIENT,
	CALC_TOTAL_PRICE,
	DELETE_CONSTRUCTOR_INGREDIENT,
	SORT_CONSTRUCTOR_INGREDIENT,
} from '../actions/burgerConstructor';

const initialState = {
	bun: null,
	constructorIngredients: [],
	totalPrice: 0,
};

const burgerConstructorReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CONSTRUCTOR_BUN: {
			return {
				...state,
				bun: action.payload,
			};
		}
		case ADD_CONSTRUCTOR_INGREDIENT: {
			return {
				...state,
				constructorIngredients: [
					...state.constructorIngredients,
					{
						...action.payload,
						uuid: uuidv4(),
					},
				],
			};
		}
		case DELETE_CONSTRUCTOR_INGREDIENT: {
			const constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.uuid !== action.payload);
			
			return {
				...state,
				constructorIngredients,
			};
		}
		case SORT_CONSTRUCTOR_INGREDIENT: {
			const { dragIndex, hoverIndex } = action.payload;
			
			const currentIngredients = state.constructorIngredients.slice(0);
			
			const ingredient = currentIngredients[dragIndex];
			
			currentIngredients.splice(dragIndex, 1);
			currentIngredients.splice(hoverIndex, 0, ingredient);
			
			return {
				...state,
				constructorIngredients: currentIngredients,
			};
		}
		case CALC_TOTAL_PRICE: {
			const priceList = state.constructorIngredients.reduce((acc, curr) => acc + curr.price, 0);
			const priceBun = !!state.bun ? state.bun.price * 2 : 0;
			
			return {
				...state,
				totalPrice: priceList + priceBun,
			};
		}
		default: {
			return state;
		}
	}
};

export { burgerConstructorReducer };