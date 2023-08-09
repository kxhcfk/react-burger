import classNames from "classnames";
import { FC } from "react";
import { TOrder, TWsOrder } from "../../types/TOrder";
import { formatAmount } from "../../utils/formatAmount";
import styles from "./OrdersInfo.module.css";

type OrdersInfoProps = {
    total: number;
    totalToday: number;
    ordersPending: TWsOrder[];
    ordersDone: TWsOrder[];
}

const OrdersInfo: FC<OrdersInfoProps> = ({ total, totalToday, ordersPending, ordersDone }) => {
    const getNumbersSection = (title: string, orders: TWsOrder[], success?: boolean) => {
        return (
            <section className={styles.sectionNumbers}>
                <h2 className={classNames(styles.title, "text_type_main-medium mb-6")}>{title}</h2>
                <ul>
                    {orders.map(order => (
                        <li key={order.number} className={classNames("text text_type_digits-default mb-2", success && styles.success)}>{order.number}</li>
                    ))}
                </ul>
            </section>
        );
    };
    const getTotalSection = (title: string, total: number) => {
        return (
            <section className={styles.sectionTotal}>
                <h2 className={classNames(styles.title, "text_type_main-medium text")}>{title}</h2>
                <p className={classNames(styles.total, "text_type_digits-large text")}>{formatAmount(total)}</p>
            </section>
        );
    };
    
    return (
        <>
            {getNumbersSection("Готовы:", ordersDone, true)}
            {getNumbersSection("В работе:", ordersPending)}
            {getTotalSection("Выполнено за все время:", total)}
            {getTotalSection("Выполнено за сегодня:", totalToday)}
        </>
    );
};

export { OrdersInfo };