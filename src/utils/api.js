import { BASE_URL } from './constatns';

const checkResponse = response => response.ok ? response.json() : Promise.reject(response.status);

const request = (url, options) => fetch(`${BASE_URL}${url}`, options).then(checkResponse)

export const getIngredients = async () => {
	return request(`/ingredients`);
};

export const getOrder = async (ingredients) => {
	return request(`/orders`, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			ingredients: ingredients,
		}),
	});
};