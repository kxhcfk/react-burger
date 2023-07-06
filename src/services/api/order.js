import { API } from './index';

class OrderService extends API {
	async create(ingredients) {
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