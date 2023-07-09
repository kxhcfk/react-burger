import {
	GET_USER_FAILED,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAILED,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	REFRESH_TOKEN_FAILED,
	REFRESH_TOKEN_REQUEST,
	REFRESH_TOKEN_SUCCESS,
	REGISTER_FAILED,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESTORE_PASSWORD_FAILED,
	RESTORE_PASSWORD_REQUEST,
	RESTORE_PASSWORD_SUCCESS, UPDATE_USER_FAILED,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
} from '../actions/auth';

const initialState = {
	user: null,
	
	getUserRequest: false,
	getUserFailed: false,
	
	updateUserRequest: false,
	updateUserFailed: false,
	
	restorePasswordSuccess: false,
	restorePasswordRequest: false,
	restorePasswordFailed: false,
	
	resetPasswordSuccess: false,
	resetPasswordRequest: false,
	resetPasswordFailed: false,
	
	registerRequest: false,
	registerFailed: false,
	
	loginRequest: false,
	loginFailed: false,
	
	logoutRequest: false,
	logoutFailed: false,
	
	refreshTokenRequest: false,
	refreshTokenFailed: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case RESTORE_PASSWORD_REQUEST: {
			return {
				...state,
				restorePasswordFailed: false,
				restorePasswordRequest: true,
				restorePasswordSuccess: false,
			};
		}
		case RESTORE_PASSWORD_SUCCESS: {
			return {
				...state,
				restorePasswordRequest: false,
				restorePasswordSuccess: true,
			};
		}
		case RESTORE_PASSWORD_FAILED: {
			return {
				...state,
				restorePasswordRequest: false,
				restorePasswordFailed: true,
			};
		}
		case RESET_PASSWORD_REQUEST: {
			return {
				...state,
				resetPasswordFailed: false,
				resetPasswordRequest: true,
				resetPasswordSuccess: false,
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				resetPasswordRequest: false,
				resetPasswordSuccess: true,
			};
		}
		case RESET_PASSWORD_FAILED: {
			return {
				...state,
				resetPasswordRequest: false,
				resetPasswordFailed: true,
			};
		}
		case REGISTER_REQUEST: {
			return {
				...state,
				registerFailed: false,
				registerRequest: true,
			};
		}
		case REGISTER_SUCCESS: {
			const { user } = action.payload;
			
			return {
				...state,
				registerRequest: false,
				user: user,
			};
		}
		case REGISTER_FAILED: {
			return {
				...state,
				registerFailed: true,
				registerRequest: false,
			};
		}
		case LOGIN_REQUEST: {
			return {
				...state,
				loginFailed: false,
				loginRequest: true,
			};
		}
		case LOGIN_SUCCESS: {
			const { user } = action.payload;
			
			return {
				...state,
				loginRequest: false,
				user: user,
			};
		}
		case LOGIN_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false,
			};
		}
		case LOGOUT_REQUEST: {
			return {
				...state,
				logoutRequest: true,
				logoutFailed: false,
			};
		}
		case LOGOUT_SUCCESS: {
			return {
				...state,
				logoutRequest: false,
				user: null,
			};
		}
		case LOGOUT_FAILED: {
			return {
				...state,
				logoutRequest: false,
				logoutFailed: true,
			};
		}
		case REFRESH_TOKEN_REQUEST: {
			return {
				...state,
				refreshTokenRequest: true,
				refreshTokenFailed: false,
			};
		}
		case REFRESH_TOKEN_SUCCESS: {
			return {
				...state,
				refreshTokenRequest: false,
			};
		}
		case REFRESH_TOKEN_FAILED: {
			return {
				...state,
				refreshTokenFailed: true,
				refreshTokenRequest: false,
			};
		}
		case GET_USER_REQUEST: {
			return {
				...state,
				getUserRequest: true,
				getUserFailed: false,
			};
		}
		case GET_USER_SUCCESS: {
			const { user } = action.payload;
			return {
				...state,
				getUserRequest: false,
				user: user,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				getUserRequest: false,
				getUserFailed: true,
			};
		}
		case UPDATE_USER_REQUEST: {
			return {
				...state,
				updateUserRequest: true,
				updateUserFailed: false,
			};
		}
		case UPDATE_USER_SUCCESS: {
			const {user} = action.payload;
			
			return {
				...state,
				updateUserRequest: false,
				user: user,
			};
		}
		case UPDATE_USER_FAILED: {
			return {
				...state,
				updateUserRequest: false,
				updateUserFailed: true,
			}
		}
		default: {
			return state;
		}
	}
};

export { authReducer };