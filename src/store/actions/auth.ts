import { AppDispatch, AppThunk } from "../../types";
import {
    TUser,
    TUserPasswordAndEmail,
    TUserWithPassword,
} from "../../types/TUser";
import { AuthService } from "../../services/api/auth";
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

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: TUser;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: TUser;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IRestorePasswordRequestAction {
    readonly type: typeof RESTORE_PASSWORD_REQUEST;
}

export interface IRestorePasswordSuccessAction {
    readonly type: typeof RESTORE_PASSWORD_SUCCESS;
}

export interface IRestorePasswordFailedAction {
    readonly type: typeof RESTORE_PASSWORD_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly user: TUser;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export type TAuthActions =
    | IRegisterRequestAction
    | IRegisterSuccessAction
    | IRegisterFailedAction
    | ILoginRequestAction
    | ILoginSuccessAction
    | ILoginFailedAction
    | ILogoutRequestAction
    | ILogoutSuccessAction
    | ILogoutFailedAction
    | IRestorePasswordRequestAction
    | IRestorePasswordSuccessAction
    | IRestorePasswordFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction
    | IGetUserRequestAction
    | IGetUserSuccessAction
    | IGetUserFailedAction
    | IUpdateUserRequestAction
    | IUpdateUserSuccessAction
    | IUpdateUserFailedAction;

export const registerRequestAction = (): IRegisterRequestAction => ({
    type: REGISTER_REQUEST,
});
export const registerSuccessAction = (user: TUser): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    user,
});
export const registerFailedAction = (): IRegisterFailedAction => ({
    type: REGISTER_FAILED,
});

export const loginRequestAction = (): ILoginRequestAction => ({
    type: LOGIN_REQUEST,
});
export const loginSuccessAction = (user: TUser): ILoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    user,
});
export const loginFailedAction = (): ILoginFailedAction => ({
    type: LOGIN_FAILED,
});

export const logoutRequestAction = (): ILogoutRequestAction => ({ type: LOGOUT_REQUEST });
export const logoutSuccessAction = (): ILogoutSuccessAction => ({ type: LOGOUT_SUCCESS });
export const logoutFailedAction = (): ILogoutFailedAction => ({ type: LOGOUT_FAILED });

export const restorePasswordRequestAction = (): IRestorePasswordRequestAction => ({ type: RESTORE_PASSWORD_REQUEST });
export const restorePasswordSuccessAction = (): IRestorePasswordSuccessAction => ({ type: RESTORE_PASSWORD_SUCCESS });
export const restorePasswordFailedAction = (): IRestorePasswordFailedAction => ({ type: RESTORE_PASSWORD_FAILED });

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({ type: RESET_PASSWORD_REQUEST });
export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({ type: RESET_PASSWORD_SUCCESS });
export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({ type: RESET_PASSWORD_FAILED });

export const getUserRequestAction = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });
export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    user,
});
export const getUserFailedAction = (): IGetUserFailedAction => ({ type: GET_USER_FAILED });

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
export const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    user,
});
export const updateUserFailedAction = (): IUpdateUserFailedAction => ({ type: UPDATE_USER_FAILED });


export const register = (data: TUserWithPassword) => async (dispatch: AppDispatch) => {
    dispatch(registerRequestAction());
    
    try {
        const res = await AuthService.register(data);
        
        if (res && res.success) {
            localStorage.setItem("accessToken", res.accessToken.split("Bearer ")[1]);
            localStorage.setItem("refreshToken", res.refreshToken);
            
            dispatch(registerSuccessAction(res.user));
        } else {
            dispatch(registerFailedAction());
        }
    } catch (e) {
        dispatch(registerFailedAction());
    }
};


export const login = (data: TUserPasswordAndEmail) => async (dispatch: AppDispatch) => {
    dispatch(loginRequestAction());
    
    try {
        const res = await AuthService.login(data);
        
        if (res && res.success) {
            localStorage.setItem("accessToken", res.accessToken.split("Bearer ")[1]);
            localStorage.setItem("refreshToken", res.refreshToken);
            
            dispatch(loginSuccessAction(res.user));
        } else {
            dispatch(loginFailedAction());
        }
    } catch (e) {
        dispatch(loginFailedAction());
    }
};


export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(logoutRequestAction());
    
    try {
        const res = await AuthService.logout();
        
        if (res && res.success) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            
            dispatch(logoutSuccessAction());
        } else {
            dispatch(logoutFailedAction());
        }
    } catch (e) {
        dispatch(logoutFailedAction());
    }
};


export const restorePassword = (data: Omit<TUser, 'name'>) => async (dispatch: AppDispatch) => {
    dispatch(restorePasswordRequestAction());
    
    try {
        const res = await AuthService.restorePassword(data);
        
        if (res && res.success) {
            dispatch(restorePasswordSuccessAction());
        } else {
            dispatch(restorePasswordFailedAction());
        }
    } catch (e) {
        dispatch(restorePasswordFailedAction());
    }
};


export const resetPassword = (data: {password: string, token: string}) => async (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAction());
    
    try {
        const res = await AuthService.resetPassword(data);
        
        if (res && res.success) {
            dispatch(resetPasswordSuccessAction());
        } else {
            dispatch(resetPasswordFailedAction());
        }
    } catch (e) {
        dispatch(resetPasswordFailedAction());
    }
};


export const getUser = () => async (dispatch: AppDispatch) => {
    dispatch(getUserRequestAction());
    
    try {
        const res = await AuthService.getUser();
        
        if (res && res.success) {
            dispatch(getUserSuccessAction(res.user));
        } else {
            dispatch(getUserFailedAction());
        }
    } catch (e) {
        dispatch(getUserFailedAction());
    }
};


export const updateUser = (data: {email?: string, password?: string, name?: string}) => async (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction());
    
    try {
        const res = await AuthService.updateUser(data);
        
        if (res && res.success) {
            dispatch(updateUserSuccessAction(res.user));
        } else {
            dispatch(updateUserFailedAction());
        }
    } catch (e) {
        dispatch(updateUserFailedAction());
    }
};