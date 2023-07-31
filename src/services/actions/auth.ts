import { AuthService } from '../api/auth';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const RESTORE_PASSWORD_REQUEST = 'RESTORE_PASSWORD_REQUEST';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

// @ts-ignore
export const register = (data) => async (dispatch) => {
	dispatch({ type: REGISTER_REQUEST });
	
	try {
		const res = await AuthService.register(data);
		
		if (res && res.success) {
			localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
			localStorage.setItem('refreshToken', res.refreshToken);
			
			dispatch({
				type: REGISTER_SUCCESS,
				payload: {
					user: res.user,
				},
			});
		} else {
			dispatch({ type: REGISTER_FAILED });
		}
	} catch (e) {
		dispatch({ type: REGISTER_FAILED });
	}
};

// @ts-ignore
export const login = (data) => async (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	
	try {
		const res = await AuthService.login(data);
		
		if (res && res.success) {
			localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
			localStorage.setItem('refreshToken', res.refreshToken);
			
			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					user: res.user,
				},
			});
		} else {
			dispatch({ type: LOGIN_FAILED });
		}
	} catch (e) {
		dispatch({ type: LOGIN_FAILED });
	}
};

// @ts-ignore
export const logout = () => async (dispatch) => {
	dispatch({ type: LOGOUT_REQUEST });
	
	try {
		const res = await AuthService.logout();
		
		if (res && res.success) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			
			dispatch({ type: LOGOUT_SUCCESS });
		} else {
			dispatch({ type: LOGOUT_FAILED });
		}
	} catch (e) {
		dispatch({ type: LOGOUT_FAILED });
	}
};

// @ts-ignore
export const restorePassword = (data) => async (dispatch) => {
	dispatch({ type: RESTORE_PASSWORD_REQUEST });
	
	try {
		const res = await AuthService.restorePassword(data);
		
		if (res && res.success) {
			dispatch({ type: RESTORE_PASSWORD_SUCCESS });
		} else {
			dispatch({ type: RESTORE_PASSWORD_FAILED });
		}
	} catch (e) {
		dispatch({ type: RESTORE_PASSWORD_FAILED });
	}
};

// @ts-ignore
export const resetPassword = (data) => async (dispatch) => {
	dispatch({ type: RESET_PASSWORD_REQUEST });
	
	try {
		const res = await AuthService.resetPassword(data);
		
		if (res && res.success) {
			dispatch({ type: RESET_PASSWORD_SUCCESS });
		} else {
			dispatch({ type: RESET_PASSWORD_FAILED });
		}
	} catch (e) {
		dispatch({ type: RESET_PASSWORD_FAILED });
	}
};

// @ts-ignore
export const getUser = () => async (dispatch) => {
	dispatch({ type: GET_USER_REQUEST });
	
	try {
		const res = await AuthService.getUser();
		
		if (res && res.success) {
			dispatch({
				type: GET_USER_SUCCESS,
				payload: {
					user: res.user,
				},
			});
		} else {
			dispatch({ type: GET_USER_FAILED });
		}
	} catch (e) {
		dispatch({ type: GET_USER_FAILED });
	}
};

// @ts-ignore
export const updateUser = (data) => async (dispatch) => {
	dispatch({ type: UPDATE_USER_REQUEST });
	
	try {
		const res = await AuthService.updateUser(data);
		
		if (res && res.success) {
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: {
					user: res.user,
				},
			});
		} else {
			dispatch({ type: UPDATE_USER_FAILED });
		}
	} catch (e) {
		dispatch({ type: UPDATE_USER_FAILED });
	}
};