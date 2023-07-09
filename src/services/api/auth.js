import { API } from './index';

class AuthService extends API {
	async login(data) {
		return this.request('/auth/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async register(data) {
		return this.request('/auth/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async logout() {
		return this.request('/auth/logout', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
	}
	
	async restorePassword(data) {
		return this.request('/password-reset', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async resetPassword(data) {
		return this.request('/password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async getUser() {
		const token = localStorage.getItem('accessToken');
		
		return this.fetchWithRefresh('/auth/user', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
	}
	
	async updateUser(data) {
		const token = localStorage.getItem('accessToken');
		
		return this.fetchWithRefresh('/auth/user', {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
	}
}

const auth = new AuthService();

export { auth as AuthService };