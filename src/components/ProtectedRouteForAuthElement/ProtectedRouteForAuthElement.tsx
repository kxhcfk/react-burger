import React, { FC } from "react";
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';

type TProtectedRouteForAuthElementProps = {
	element: React.ReactNode;
}

const ProtectedRouteForAuthElement: FC<TProtectedRouteForAuthElementProps> = ({ element }) => {
	// @ts-ignore
	const { user, getUserRequest } = useSelector(store => store.auth);
	
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