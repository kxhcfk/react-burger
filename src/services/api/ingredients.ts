import { TIngredient } from "../../types/TIngredient";
import { API } from './index';

class IngredientsService extends API {
	async get(): Promise<{success: boolean, data: TIngredient[]}> {
		return this.request(`/ingredients`);
	};
}

const service = new IngredientsService();

export { service as IngredientsService };