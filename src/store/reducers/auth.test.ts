import {authReducer as reducer, initialState as state} from "./auth";
import {
    getUserFailedAction,
    getUserRequestAction,
    getUserSuccessAction,
    loginFailedAction,
    loginRequestAction,
    loginSuccessAction,
    logoutFailedAction,
    logoutRequestAction,
    logoutSuccessAction,
    registerFailedAction,
    registerRequestAction,
    registerSuccessAction,
    resetPasswordFailedAction,
    resetPasswordRequestAction,
    resetPasswordSuccessAction,
    restorePasswordFailedAction,
    restorePasswordRequestAction,
    restorePasswordSuccessAction,
    updateUserFailedAction,
    updateUserRequestAction,
    updateUserSuccessAction,
} from "../actions/auth";
import { userTest } from "../../utils/constatns";

describe("Auth reducer", () => {
    it("should handle initial state", () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
    })
    it("should handle RESTORE_PASSWORD_REQUEST", () => {
        expect(reducer(state, restorePasswordRequestAction())).toEqual({
            ...state,
            restorePasswordFailed: false,
            restorePasswordRequest: true,
            restorePasswordSuccess: false,
        })
    })
    it("should handle RESTORE_PASSWORD_SUCCESS", () => {
        expect(reducer(state, restorePasswordSuccessAction())).toEqual({
            ...state,
            restorePasswordRequest: false,
            restorePasswordSuccess: true,
        })
    })
    it("should handle RESTORE_PASSWORD_FAILED", () => {
        expect(reducer(state, restorePasswordFailedAction())).toEqual({
            ...state,
            restorePasswordRequest: false,
            restorePasswordFailed: true,
        })
    })
    
    it("should handle RESET_PASSWORD_REQUEST", () => {
        expect(reducer(state, resetPasswordRequestAction())).toEqual({
            ...state,
            resetPasswordFailed: false,
            resetPasswordRequest: true,
            resetPasswordSuccess: false,
        })
    })
    it("should handle RESET_PASSWORD_SUCCESS", () => {
        expect(reducer(state, resetPasswordSuccessAction())).toEqual({
            ...state,
            resetPasswordRequest: false,
            resetPasswordSuccess: true,
        })
    })
    it("should handle RESET_PASSWORD_FAILED", () => {
        expect(reducer(state, resetPasswordFailedAction())).toEqual({
            ...state,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
        })
    })
    
    it("should handle REGISTER_REQUEST", () => {
        expect(reducer(state, registerRequestAction())).toEqual({
            ...state,
            registerFailed: false,
            registerRequest: true,
            getUserLoaded: false,
        })
    })
    it("should handle REGISTER_SUCCESS", () => {
        expect(reducer(state, registerSuccessAction(userTest))).toEqual({
            ...state,
            registerRequest: false,
            user: userTest,
            getUserLoaded: true,
        })
    })
    it("should handle REGISTER_FAILED", () => {
        expect(reducer(state, registerFailedAction())).toEqual({
            ...state,
            registerFailed: true,
            registerRequest: false,
            getUserLoaded: true,
        })
    })
    
    it("should handle LOGIN_REQUEST", () => {
        expect(reducer(state, loginRequestAction())).toEqual({
            ...state,
            loginFailed: false,
            loginRequest: true,
            getUserLoaded: false,
        })
    })
    it("should handle LOGIN_SUCCESS", () => {
        expect(reducer(state, loginSuccessAction(userTest))).toEqual({
            ...state,
            loginRequest: false,
            user: userTest,
            getUserLoaded: true,
        })
    })
    it("should handle LOGIN_FAILED", () => {
        expect(reducer(state, loginFailedAction())).toEqual({
            ...state,
            loginFailed: true,
            loginRequest: false,
            getUserLoaded: true,
        })
    })
    
    it("should handle LOGOUT_REQUEST", () => {
        expect(reducer(state, logoutRequestAction())).toEqual({
            ...state,
            logoutRequest: true,
            logoutFailed: false,
            getUserLoaded: false,
        })
    })
    it("should handle LOGOUT_SUCCESS", () => {
        expect(reducer(state, logoutSuccessAction())).toEqual({
            ...state,
            logoutRequest: false,
            user: null,
            getUserLoaded: true,
        })
    })
    it("should handle LOGOUT_FAILED", () => {
        expect(reducer(state, logoutFailedAction())).toEqual({
            ...state,
            logoutRequest: false,
            logoutFailed: true,
            getUserLoaded: true,
        })
    })
    
    it("should handle GET_USER_REQUEST", () => {
        expect(reducer(state, getUserRequestAction())).toEqual({
            ...state,
            getUserRequest: true,
            getUserFailed: false,
            getUserLoaded: false,
        })
    })
    it("should handle GET_USER_SUCCESS", () => {
        expect(reducer(state, getUserSuccessAction(userTest))).toEqual({
            ...state,
            getUserRequest: false,
            getUserLoaded: true,
            user: userTest,
        })
    })
    it("should handle GET_USER_FAILED", () => {
        expect(reducer(state, getUserFailedAction())).toEqual({
            ...state,
            getUserRequest: false,
            getUserLoaded: true,
            getUserFailed: true,
        })
    })
    
    it("should handle UPDATE_USER_REQUEST", () => {
        expect(reducer(state, updateUserRequestAction())).toEqual({
            ...state,
            updateUserRequest: true,
            updateUserFailed: false,
            getUserLoaded: false,
        })
    })
    it("should handle UPDATE_USER_SUCCESS", () => {
        expect(reducer(state, updateUserSuccessAction(userTest))).toEqual({
            ...state,
            updateUserRequest: false,
            user: userTest,
            getUserLoaded: true,
        })
    })
    it("should handle UPDATE_USER_FAILED", () => {
        expect(reducer(state, updateUserFailedAction())).toEqual({
            ...state,
            updateUserRequest: false,
            updateUserFailed: true,
            getUserLoaded: true,
        })
    })
})