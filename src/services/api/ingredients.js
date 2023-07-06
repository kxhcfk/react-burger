import { API } from './index';

class IngredientsService extends API {
	async get() {
		return this.request(`/ingredients`);
	};
}

const service = new IngredientsService();

export { service as IngredientsService };