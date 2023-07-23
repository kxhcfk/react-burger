import { TIngredient } from "../../types/TIngredient";
import { API } from './index';

class OrderService extends API {
	async create(ingredients: TIngredient[]): Promise<{success: boolean, order: {number: number}}> {
		return this.request('/orders', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				ingredients: ingredients,
			}),
		});
	};
}

const service = new OrderService();

export { service as OrderService };