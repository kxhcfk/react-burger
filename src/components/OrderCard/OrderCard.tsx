import {
    CurrencyIcon, FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import {
    memo,
    NamedExoticComponent,
    useMemo,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/store";
import { TIngredient } from "../../types/TIngredient";
import { TWsOrder } from "../../types/TOrder";
import { ROUTES } from "../../utils/constatns";
import { getTranslateStatus } from "../../utils/getTranslateStatus";
import styles from "./OrderCard.module.css";

type OrderCardProps = {
    details?: boolean;
    baseUrlLink?: string;
    order: TWsOrder;
}

type TOrderIngredient = TIngredient & {
    count: number;
}

const OrderCard: NamedExoticComponent<OrderCardProps> = memo(({
    details = false,
    order,
    baseUrlLink = "/profile/orders",
}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const { ingredients } = useSelector(state => state.ingredients);
    
    const orderIngredients = useMemo(() => (
        Object.values(
            ingredients
                .filter(ingredient => order.ingredients.includes(ingredient._id))
                .reduce<Record<string, TOrderIngredient>>((acc, curr) => {
                    if (acc[curr._id]) {
                        acc[curr._id].count = acc[curr._id].count + 1;
                    } else {
                        acc[curr._id] = {
                            ...curr,
                            count: 1
                        };
                    }
                    
                    return acc;
                }, {})
        )
    ), [ingredients]);
    
    const price = useMemo(() => (
        orderIngredients.reduce((acc, curr) => acc + (curr.price * curr.count), 0)
    ), [ingredients, order]);
    
    return (
        <>
            {details ? (
                <article className={styles.details}>
                    <header className={classNames(styles.header, "mb-10")}>
                        <span className={classNames(styles.number, "text text_type_digits-default")}>#{order.number}</span>
                    </header>
                    <div className={classNames(styles.content, "mb-10")}>
                        <h3 className={classNames(styles.title, "text text_type_main-medium mb-3")}>{order.name}</h3>
                        <p className={classNames(styles.status, "text text_type_main-default")}>{getTranslateStatus(order.status)}</p>
                        <div className="mt-15">
                            <h3 className={classNames(styles.ingredientListTitle, "text text_type_main-medium mb-6")}>Состав:</h3>
                            <ul className={classNames(styles.ingredientList, 'custom-scroll')}>
                                {orderIngredients.map((ingredient, i) => (
                                    <li key={ingredient._id} className={styles.ingredient}>
                                        <div className={styles.ingredientImage}>
                                            <img
                                                src={ingredient.image_mobile}
                                                alt={ingredient.name}
                                            />
                                        </div>
                                        <span className={classNames(styles.ingredientName, "text text_type_main-default")}>{ingredient.name}</span>
                                        <span className={classNames(styles.price, "text text_type_digits-default")}>
                                            {ingredient.count} x {ingredient.price}
                                            <CurrencyIcon type="primary"/>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <footer className={styles.footer}>
                        <span className={classNames(styles.time, "text text_color_inactive text_type_main-default")}>{FormattedDate({ date: new Date(order.createdAt) })}</span>
                        <span className={classNames(styles.price, "text text_type_digits-default")}>
                            {price}
                            <CurrencyIcon type="primary"/>
                        </span>
                    </footer>
                </article>
            ) : (
                <Link to={`${baseUrlLink}/${order.number}`} state={{ background: location }}>
                    <article className={classNames(styles.root, "p-6")}>
                        <header className={classNames(styles.header, "mb-6")}>
                            <span className={classNames(styles.number, "text text_type_digits-default")}>#{order.number}</span>
                            <span className={classNames(styles.time, "text text_color_inactive text_type_main-default")}>{FormattedDate({ date: new Date(order.createdAt) })}</span>
                        </header>
                        <div className={classNames(styles.content, "mb-6")}>
                            <h3 className={classNames(styles.title, "text text_type_main-medium mb-2")}>{order.name}</h3>
                            {baseUrlLink !== ROUTES.feed && (
                                <p className={classNames(styles.status, "text text_type_main-default")}>{getTranslateStatus(order.status)}</p>
                            )}
                        </div>
                        <footer className={styles.footer}>
                            <ul className={styles.ingredientList}>
                                {orderIngredients.slice(0, 6)
                                    .map((ingredient, i) => (
                                        <li
                                            key={i}
                                            className={styles.ingredient}
                                        >
                                            <div className={styles.ingredientImage}>
                                                <img
                                                    src={ingredient.image_mobile}
                                                    alt={ingredient.name}
                                                />
                                                {orderIngredients.length > 6 && i === 0 && (
                                                    <span className={classNames(styles.ingredientCount, "text text_type_main-default")}>+{orderIngredients.length - 5}</span>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                            <span className={classNames(styles.price, "text text_type_digits-default")}>
                                {price}
                                <CurrencyIcon type="primary"/>
                            </span>
                        </footer>
                    </article>
                </Link>
            )}
        </>
    );
});

export { OrderCard };