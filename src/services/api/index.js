import { BASE_URL } from '../../utils/constatns';

class API {
	checkResponse = (response) => {
		if (response.ok) {
			return response.json();
		}
		
		return Promise.reject(response.status);
	};
	
	request = (url, options) => {
		return fetch(`${BASE_URL}${url}`, options).then(this.checkResponse);
	};
}

export { API };