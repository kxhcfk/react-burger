import classNames from "classnames";
import { useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import {
    closeUserOrders,
    getUserOrdersConnect,
} from "../../store/actions/wsUserOrders";
import { useDispatch, useSelector } from "../../store/store";
import {
    ROUTES,
    WS_USER_ORDERS_URL,
} from "../../utils/constatns";
import styles from "./ProfileOrdersPage.module.css";

const ProfileOrdersPage = () => {
    const dispatch = useDispatch();
    
    const {
        wsConnected,
        orders,
    } = useSelector(state => state.userOrders);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        
        dispatch(getUserOrdersConnect(WS_USER_ORDERS_URL + `?token=${token}`));
        
        return () => {
            dispatch(closeUserOrders());
        };
    }, []);
    
    return (
        <>
            {!wsConnected ? (
                <Loader/>
            ) : (
                <section className={styles.root}>
                    <div className={classNames(styles.wrapper, "custom-scroll")}>
                        {orders.map(order => (
                            <OrderCard
                                order={order}
                                baseUrlLink={ROUTES.profileOrders}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
};

export { ProfileOrdersPage };