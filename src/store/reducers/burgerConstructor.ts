import { TIngredient, TIngredientWithUuid } from "../../types/TIngredient";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import {
	ADD_CONSTRUCTOR_BUN,
	ADD_CONSTRUCTOR_INGREDIENT, CALC_TOTAL_PRICE, CLEAR_CONSTRUCTOR,
	DELETE_CONSTRUCTOR_INGREDIENT, SORT_CONSTRUCTOR_INGREDIENT,
} from "../constants/burgerConstructor";

type TBurgerConstructorState = {
	bun: TIngredient | null;
	constructorIngredients: TIngredientWithUuid[];
	totalPrice: number;
}

export const initialState: TBurgerConstructorState = {
	bun: null,
	constructorIngredients: [],
	totalPrice: 0,
};

const burgerConstructorReducer = (state: TBurgerConstructorState = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
	switch (action.type) {
		case ADD_CONSTRUCTOR_BUN: {
			return {
				...state,
				bun: action.bun,
			};
		}
		case ADD_CONSTRUCTOR_INGREDIENT: {
			return {
				...state,
				constructorIngredients: [
					...state.constructorIngredients,
					action.ingredient,
				],
			};
		}
		case DELETE_CONSTRUCTOR_INGREDIENT: {
			const constructorIngredients = state.constructorIngredients.filter(ingredient => ingredient.uuid !== action.uuid);
			
			return {
				...state,
				constructorIngredients,
			};
		}
		case SORT_CONSTRUCTOR_INGREDIENT: {
			const { dragIndex, hoverIndex } = action;
			
			const currentIngredients = state.constructorIngredients.slice(0);
			
			const ingredient = currentIngredients[dragIndex];
			
			currentIngredients.splice(dragIndex, 1);
			currentIngredients.splice(hoverIndex, 0, ingredient);
			
			return {
				...state,
				constructorIngredients: currentIngredients,
			};
		}
		case CLEAR_CONSTRUCTOR: {
			return initialState
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