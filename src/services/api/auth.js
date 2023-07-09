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
	
	async token() {
		return this.request('/auth/token', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
	}
	
	async getAccessToken() {
		let token = localStorage.getItem('accessToken');
		
		if (!token) {
			const res = await this.token();
			
			if (res && res.success) {
				token = res.accessToken.split('Bearer ')[1];
				
				localStorage.setItem('accessToken', token);
			}
		}
		
		return token;
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
		const token = await this.getAccessToken();
		
		return this.request('/auth/user', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
	}
	
	async updateUser(data) {
		const token = await this.getAccessToken();
		
		return this.request('/auth/user', {
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