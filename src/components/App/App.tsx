import React, { FC, useEffect } from "react";

import { Route, Routes, useLocation } from 'react-router-dom';

import { ROUTES } from '../../utils/constatns';
import MainPage from '../../pages/MainPage/MainPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../../pages/ResetPasswordPage/ResetPasswordPage';
import IngredientDetailsPage from '../../pages/IngredientDetailsPage/IngredientDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import ProfileLayout from '../../layouts/ProfileLayout/ProfileLayout';
import ProfileInfoPage from '../../pages/ProfileInfoPage/ProfileInfoPage';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import { getUser } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import ProtectedRouteForAuthElement from '../ProtectedRouteForAuthElement/ProtectedRouteForAuthElement';

const App: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	
	useEffect(() => {
		if (localStorage.getItem('refreshToken')) {
			// @ts-ignore
			dispatch(getUser());
		}
	}, []);
	
	return (
		<>
			<Routes location={location.state?.isModal}>
				<Route path={ROUTES.main} element={<BaseLayout />}>
					<Route index element={<MainPage />}/>
					<Route path={ROUTES.login} element={<ProtectedRouteForAuthElement element={<LoginPage />} />} />
					<Route path={ROUTES.register} element={<ProtectedRouteForAuthElement element={<RegisterPage />} /> } />
					<Route path={ROUTES.forgotPassword} element={<ProtectedRouteForAuthElement element={<ForgotPasswordPage />} /> } />
					<Route path={ROUTES.resetPassword} element={<ProtectedRouteForAuthElement element={<ResetPasswordPage />} /> } />
					<Route path={ROUTES.profile} element={<ProtectedRouteElement element={<ProfileLayout />}/>}>
						<Route index  element={<ProfileInfoPage />} />
						<Route path={ROUTES.profileOrders} element={<h1 className="text text_type_main-large">profile orders</h1>} />
						<Route path={ROUTES.profileOrderDetails} element={<h1 className="text text_type_main-large">profile order details</h1>} />
					</Route>
					<Route path={ROUTES.ingredientDetails} element={<IngredientDetailsPage />} />
					<Route path={ROUTES.notFound} element={<NotFoundPage />} />
				</Route>
			</Routes>
			{location.state?.isModal && (
				<Routes>
					<Route path={ROUTES.ingredientDetails} element={<IngredientDetailsPage />} />
				</Routes>
			)}
		</>
	);
};

export default App;
