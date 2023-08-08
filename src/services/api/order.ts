import { TIngredient } from "../../types/TIngredient";
import { TWsOrder } from "../../types/TOrder";
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
	
	async get(number: number): Promise<{success: boolean, orders: TWsOrder[]}> {
		return this.request(`/orders/${number}`, {
			headers: {
				'Content-type': 'application/json',
			},
		});
	}
}

const service = new OrderService();

export { service as OrderService };