import classNames from "classnames";
import { memo, useEffect, useMemo } from "react";
import Loader from "../../components/Loader/Loader";
import { OrderCard } from "../../components/OrderCard/OrderCard";
import { OrdersInfo } from "../../components/OrdersInfo/OrdersInfo";
import {
    closeAllOrders,
    getAllOrders,
    getAllOrdersConnect,
} from "../../store/actions/wsAllOrders";
import { useDispatch, useSelector } from "../../store/store";
import { WS_ALL_ORDERS_URL } from "../../utils/constatns";
import styles from "./FeedPage.module.css";

const FeedPage = memo(() => {
    const dispatch = useDispatch();
    
    const {
        wsConnected,
        orders,
        total,
        totalToday,
    } = useSelector(state => state.allOrders);
    
    useEffect(() => {
        dispatch(getAllOrdersConnect(WS_ALL_ORDERS_URL));
        
        return () => {
            dispatch(closeAllOrders())
        };
    }, []);
    
    const ordersPending = useMemo(() => {
        return orders
            .filter(order => order.status === 'pending')
            .slice(0, 5)
    }, [orders]);
    
    const ordersDone = useMemo(() => {
        return orders
            .filter(order => order.status === 'done')
            .slice(0, 5)
    }, [orders]);
    
    return (
        <>
            {!wsConnected ? (
                <Loader/>
            ) : (
                <main className={classNames(styles.root, "pt-10 pb-15")}>
                    <div className="container">
                        <h1 className={classNames(styles.title, "text text_type_main-large mb-5")}>
                            Лента заказов
                        </h1>
                        
                        <div className={styles.wrapper}>
                            <div className={classNames(styles.cardsWrapper, "custom-scroll")}>
                                {!!orders?.length && orders.map(order => (
                                    <OrderCard key={order.number} order={order} baseUrlLink="/feed"/>
                                ))}
                            </div>
                            <div className={styles.info}>
                                <OrdersInfo ordersDone={ordersDone} ordersPending={ordersPending} total={total} totalToday={totalToday}/>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
});

export { FeedPage };