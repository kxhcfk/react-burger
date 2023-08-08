import { TWsOrder } from "../../types/TOrder";
import { API } from './index';

class OrderService extends API {
	async create(ingredients: string[]): Promise<{success: boolean, order: {number: number}}> {
		const token = localStorage.getItem('accessToken');
		
		return this.fetchWithRefresh('/orders', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
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