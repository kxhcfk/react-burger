import React, { FC } from "react";
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';

type TProtectedRouteElementProps = {
	element: React.ReactNode
}

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element }) => {
	const location = useLocation();
	
	// @ts-ignore
	const { user, getUserRequest } = useSelector(store => store.auth);
	
	return (
		<>
			{getUserRequest ? (
				<Loader/>
			) : (
				user ? element : (
					<Navigate
						to={ROUTES.login}
						replace={true}
						state={{ from: location.pathname }}
					/>
				)
			)}
		</>
	);
};

export default ProtectedRouteElement;