import { URL_INGREDIENTS } from './constatns';

export const getIngredients = async () => {
	const res = await fetch(URL_INGREDIENTS);
	
	if (res.ok) {
		return res.json();
	}
	
	return Promise.reject(`Error ${res.status}`);
};