import {
	TUser,
	TUserPasswordAndEmail,
	TUserWithPassword,
} from "../../types/TUser";
import { API } from './index';

type TLoginProps = {
	name: string,
	password: string,
}

type TAuthReturn = {
	success: boolean,
	user: {
		email: string,
		name: string,
	}
}

type TAuthReturnWithTokens = TAuthReturn & {
	accessToken: string,
	refreshToken: string,
}

type TReturn = {
	success: boolean,
	message: string,
}

class AuthService extends API {
	async login(data: TUserPasswordAndEmail): Promise<TAuthReturnWithTokens> {
		return this.request('/auth/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async register(data: TUserWithPassword): Promise<TAuthReturnWithTokens> {
		return this.request('/auth/register', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async logout(): Promise<TReturn> {
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
	
	async restorePassword(data: Omit<TUser, 'name'>): Promise<TReturn> {
		return this.request('/password-reset', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async resetPassword(data: {password: string, token: string}): Promise<TReturn> {
		return this.request('/password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	}
	
	async getUser(): Promise<TAuthReturn> {
		const token = localStorage.getItem('accessToken');
		
		return this.fetchWithRefresh('/auth/user', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
	}
	
	async updateUser(data: {email?: string, password?: string, name?: string}): Promise<TAuthReturn> {
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