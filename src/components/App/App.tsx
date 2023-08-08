import React, { FC, useEffect } from "react";

import { Route, Routes, useLocation } from 'react-router-dom';
import { FeedDetailsPage } from "../../pages/FeedDetailsPage/FeedDetailsPage";
import { FeedPage } from "../../pages/FeedPage/FeedPage";
import {
	ProfileOrderDetailPage
} from "../../pages/ProfileOrderDetailPage/ProfileOrderDetailPage";
import {
	ProfileOrdersPage
} from "../../pages/ProfileOrdersPage/ProfileOrdersPage";
import { getIngredients } from "../../store/actions/ingredients";
import { useDispatch } from "../../store/store";

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
import { getUser } from '../../store/actions/auth';
import ProtectedRouteForAuthElement from '../ProtectedRouteForAuthElement/ProtectedRouteForAuthElement';

const App: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	
	useEffect(() => {
		if (localStorage.getItem('refreshToken')) {
			dispatch(getUser());
		}
		
		dispatch(getIngredients());
	}, []);
	
	return (
		<>
			<Routes location={location.state?.background}>
				<Route path={ROUTES.main} element={<BaseLayout />}>
					<Route index element={<MainPage />}/>
					<Route path={ROUTES.login} element={<ProtectedRouteForAuthElement element={<LoginPage />} />} />
					<Route path={ROUTES.register} element={<ProtectedRouteForAuthElement element={<RegisterPage />} /> } />
					<Route path={ROUTES.forgotPassword} element={<ProtectedRouteForAuthElement element={<ForgotPasswordPage />} /> } />
					<Route path={ROUTES.resetPassword} element={<ProtectedRouteForAuthElement element={<ResetPasswordPage />} /> } />
					<Route path={ROUTES.profile} element={<ProtectedRouteElement element={<ProfileLayout />}/>}>
						<Route index  element={<ProfileInfoPage />} />
						<Route path={ROUTES.profileOrders} element={<ProtectedRouteElement element={<ProfileOrdersPage/>} />} />
					</Route>
					<Route path={ROUTES.profileOrderDetails} element={<ProfileOrderDetailPage/> } />
					<Route path={ROUTES.ingredientDetails} element={<ProtectedRouteElement element={<IngredientDetailsPage />}/>} />
					<Route path={ROUTES.feed} element={<FeedPage />} />
					<Route path={ROUTES.feedDetails} element={<FeedDetailsPage />} />
					<Route path={ROUTES.notFound} element={<NotFoundPage />} />
				</Route>
			</Routes>
			{location.state?.background && (
				<Routes>
					<Route path={ROUTES.ingredientDetails} element={<IngredientDetailsPage />} />
					<Route path={ROUTES.profileOrderDetails} element={<ProfileOrderDetailPage />} />
					<Route path={ROUTES.feedDetails} element={<FeedDetailsPage />} />
				</Routes>
			)}
		</>
	);
};

export default App;
