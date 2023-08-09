import React, { FC } from "react";
import { useSelector } from "../../store/store";
import Loader from '../Loader/Loader';
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from '../../utils/constatns';

type TProtectedRouteForAuthElementProps = {
	element: React.ReactNode;
}

const ProtectedRouteForAuthElement: FC<TProtectedRouteForAuthElementProps> = ({ element }) => {
	const { user, getUserRequest, getUserLoaded } = useSelector(store => store.auth);
	const location = useLocation();
	
	if (!localStorage.getItem('refreshToken')) {
		return <>{element}</>
	}
	
	if (location.state?.from) {
		return <Navigate
			to={location.state?.from}
			replace
		/>
	}
	
	return (
		<>
			{getUserRequest ? (
				<Loader/>
			) : (
				!user ? element : (
					<Navigate
						to={ROUTES.main}
						replace={true}
					/>
				)
			)}
		</>
	);
};

export default ProtectedRouteForAuthElement;