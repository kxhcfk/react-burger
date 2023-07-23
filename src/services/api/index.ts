import { BASE_URL } from '../../utils/constatns';

class API {
	checkResponse = (response: Response) => {
		if (response.ok) {
			return response.json();
		}
		
		return Promise.reject(response);
	};
	
	request = <T>(url: string, options?: RequestInit): Promise<T> => {
		return fetch(`${BASE_URL}${url}`, options).then(this.checkResponse);
	};
	
	refreshToken = async (): Promise<{
		success: boolean,
		accessToken: string,
		refreshToken: string
	}> => {
		return this.request('/auth/token', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		});
	};
	
	fetchWithRefresh = async <T>(url: string, options: RequestInit): Promise<T> => {
		try {
			const res = await fetch(`${BASE_URL}${url}`, options);
			
			return await this.checkResponse(res);
		} catch (e: any) {
			const data = await e.json();
			
			if (data.message === 'jwt expired') {
				const refreshData = await this.refreshToken();
				
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken.split('Bearer ')[1]);
				
				options.headers = options?.headers ? new Headers(options.headers) : new Headers();
				
				options.headers.set("Authorization", refreshData.accessToken);
				
				const res = await fetch(`${BASE_URL}${url}`, options);
				
				return this.checkResponse(res);
			}
			
			return Promise.reject(e);
		}
	};
}

export { API };