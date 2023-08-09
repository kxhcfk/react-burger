import classNames from "classnames";

import React, { FC, memo, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import {
    addConstructorBunAction,
    addConstructorIngredientAction,
    calcTotalPriceAction,
} from "../../store/actions/burgerConstructor";

import { getOrder } from "../../store/actions/order";

import {
    Button,
    ConstructorElement,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../store/store";
import { TIngredientWithUuid } from "../../types/TIngredient";

import BurgerConstructorList
    from "../BurgerConstructorList/BurgerConstructorList";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import Loader from "../Loader/Loader";

import { useModal } from "../../hooks/useModal";

import { ROUTES, TYPE_BUN } from "../../utils/constatns";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor: FC = memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {
        bun,
        constructorIngredients,
        totalPrice,
    } = useSelector(store => store.burgerConstructor);
    const {
        order,
        orderRequest,
        orderFailed,
    } = useSelector(store => store.order);
    const { user } = useSelector(store => store.auth);
    
    const { isModalOpen, openModal, closeModal } = useModal();
    
    const handleOrderClick = useCallback(() => {
        if (!user) {
            navigate(ROUTES.login, { state: { from: location.pathname } });
            
            return;
        }
        
        openModal();
        
        const ingredients = constructorIngredients.map((ingredient: TIngredientWithUuid) => ingredient._id);
        
        if (bun) {
            ingredients.push(bun._id);
        }
        
        dispatch(getOrder(ingredients));
    }, [bun, constructorIngredients]);
    
    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({ ingredient }: { ingredient: TIngredientWithUuid }) {
            
            if (ingredient.type === TYPE_BUN) {
                dispatch(addConstructorBunAction(ingredient));
            } else {
                dispatch(addConstructorIngredientAction(ingredient));
            }
            
            dispatch(calcTotalPriceAction());
        },
    });
    
    return (
        <>
            <div
                className={styles.root}
                ref={dropTarget}
            >
                <div className={classNames(styles.wrapper, "pt-15")}>
                    <div className={styles.listItem}>
                        {bun && (
                            <ConstructorElement
                                type="top"
                                isLocked
                                text={`${bun.name} (верх)`}
                                thumbnail={bun.image}
                                price={bun.price}
                            />
                        )}
                    </div>
                    
                    {!!constructorIngredients.length && (
                        <BurgerConstructorList ingredients={constructorIngredients}/>
                    )}
                    
                    <div className={styles.listItem}>
                        {bun && (
                            <ConstructorElement
                                type="bottom"
                                isLocked
                                text={`${bun.name} (низ)`}
                                thumbnail={bun.image}
                                price={bun.price}
                            />
                        )}
                    </div>
                </div>
                <div className={classNames(styles.footer, "mt-10")}>
                    <div className={classNames(styles.price, "mr-10")}>
                        <span className="text text_type_digits-medium">{totalPrice}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        disabled={!bun}
                        onClick={handleOrderClick}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </div>
            
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                >
                    {orderRequest
                        ? <Loader/>
                        : orderFailed
                            ? <h2>Произошла ошибка</h2>
                            : order
                                ? <OrderDetails number={order.number}/>
                                : <h2>Произошла ошибка</h2>
                    }
                </Modal>
            )}
        </>
    );
});

export default BurgerConstructor;