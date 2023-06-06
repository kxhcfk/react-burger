import { URL_INGREDIENTS, URL_ORDERS } from './constatns';

const checkResponse = response => response.ok ? response.json() : Promise.reject(response.status);

export const getIngredients = async () => {
	const res = await fetch(URL_INGREDIENTS);
	
	return checkResponse(res);
};

export const getOrder = async (ingredients) => {
	const res = await fetch(URL_ORDERS, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
			ingredients: ingredients
		}),
	});
	
	return checkResponse(res);
}