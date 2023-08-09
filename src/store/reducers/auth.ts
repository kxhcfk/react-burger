import { TUser } from "../../types/TUser";
import { TAuthActions } from "../actions/auth";
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
    REGISTER_FAILED,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
} from "../constants/auth";

type TAuthState = {
    user: TUser | null,
    
    getUserRequest: boolean,
    getUserFailed: boolean,
    getUserLoaded: boolean,
    
    updateUserRequest: boolean,
    updateUserFailed: boolean,
    
    restorePasswordSuccess: boolean,
    restorePasswordRequest: boolean,
    restorePasswordFailed: boolean,
    
    resetPasswordSuccess: boolean,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,
    
    registerRequest: boolean,
    registerFailed: boolean,
    
    loginRequest: boolean,
    loginFailed: boolean,
    
    logoutRequest: boolean,
    logoutFailed: boolean,
}

const initialState: TAuthState = {
    user: null,
    
    getUserRequest: false,
    getUserFailed: false,
    getUserLoaded: false,
    
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
};

const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
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
                getUserLoaded: false,
            };
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                registerRequest: false,
                user: action.user,
                getUserLoaded: true,
            };
        }
        case REGISTER_FAILED: {
            return {
                ...state,
                registerFailed: true,
                registerRequest: false,
                getUserLoaded: true,
            };
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginFailed: false,
                loginRequest: true,
                getUserLoaded: false,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                user: action.user,
                getUserLoaded: true,
            };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginFailed: true,
                loginRequest: false,
                getUserLoaded: true,
            };
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false,
                getUserLoaded: false,
            };
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                user: null,
                getUserLoaded: true,
            };
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true,
                getUserLoaded: true,
            };
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: false,
                getUserLoaded: false,
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserLoaded: true,
                user: action.user,
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false,
                getUserLoaded: true,
                getUserFailed: true,
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
                getUserLoaded: false,
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                user: action.user,
                getUserLoaded: true,
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
                getUserLoaded: true,
            };
        }
        default: {
            return state;
        }
    }
};

export { authReducer };