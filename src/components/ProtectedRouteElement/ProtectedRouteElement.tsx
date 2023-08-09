import React, { FC } from "react";
import { getUser } from "../../store/actions/auth";
import { useSelector } from "../../store/store";
import Loader from "../Loader/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constatns";

type TProtectedRouteElementProps = {
    element: React.ReactNode
}

const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element }) => {
    const location = useLocation();
    
    const { user, getUserRequest, getUserLoaded } = useSelector(store => store.auth);
    
    if (!localStorage.getItem('refreshToken')) {
        return <Navigate
            to={ROUTES.login}
            replace
            state={{ ...location.state, from: location.pathname }}
        />
    }
    
    if (!getUserLoaded || getUserRequest) {
        return <Loader/>
    }
    
    return (
        <>
            {user ? element : (
                <Navigate
                    to={ROUTES.login}
                    replace
                    state={{ ...location.state, from: location.pathname }}
                />
            )}
        </>
    );
};

export default ProtectedRouteElement;