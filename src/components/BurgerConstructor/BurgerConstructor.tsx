import classNames from 'classnames';

import React, { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';

import {
	ADD_CONSTRUCTOR_BUN,
	ADD_CONSTRUCTOR_INGREDIENT,
	CALC_TOTAL_PRICE,
	CLEAR_CONSTRUCTOR,
} from '../../services/actions/burgerConstructor';

import { getOrder } from '../../services/actions/order';

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TIngredientWithUuid } from "../../types/TIngredient";

import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import Loader from '../Loader/Loader';

import { useModal } from '../../hooks/useModal';

import { TYPE_BUN } from '../../utils/constatns';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor: FC = memo(() => {
	const dispatch = useDispatch();
	
	// @ts-ignore
	const { bun, constructorIngredients, totalPrice } = useSelector(store => store.burgerConstructor);
	// @ts-ignore
	const { order, orderRequest, orderFailed } = useSelector(store => store.order);
	
	const { isModalOpen, openModal, closeModal } = useModal();
	
	const handleOrderClick = useCallback(() => {
		openModal();
		
		// @ts-ignore
		dispatch(getOrder([
			bun._id,
			...constructorIngredients.map((ingredient: TIngredientWithUuid) => ingredient._id),
		]))
			.then(() => {
				dispatch({ type: CLEAR_CONSTRUCTOR });
			});
	}, [bun, constructorIngredients]);
	
	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop({ ingredient }: {ingredient: TIngredientWithUuid}) {
			
			if (ingredient.type === TYPE_BUN) {
				dispatch({ type: ADD_CONSTRUCTOR_BUN, payload: ingredient });
			} else {
				dispatch({ type: ADD_CONSTRUCTOR_INGREDIENT, payload: ingredient });
			}
			
			dispatch({ type: CALC_TOTAL_PRICE });
		},
	});
	
	return (
		<>
			<div
				className={styles.root}
				ref={dropTarget}
			>
				<div className={classNames(styles.wrapper, 'pt-15')}>
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
				<div className={classNames(styles.footer, 'mt-10')}>
					<div className={classNames(styles.price, 'mr-10')}>
						<span className="text text_type_digits-medium">{totalPrice}</span>
						<CurrencyIcon type="primary"/>
					</div>
					<Button
						htmlType="button"
						type="primary"
						size="large"
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
							: <OrderDetails number={order.number}/>
					}
				</Modal>
			)}
		</>
	);
});

export default BurgerConstructor;