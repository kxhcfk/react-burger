import classNames from 'classnames';

import React, { memo, useContext, useMemo, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import { OrderContext } from '../../services/context/order';

import { TYPE_BUN } from '../../utils/constatns';

import styles from './BurgerConstructor.module.css';
import { getOrder } from '../../utils/api';

const BurgerConstructor = memo(() => {
	const { constructorIngredients } = useContext(OrderContext);
	const [orderNumber, setOrderNumber] = useState(null);
	
	const constructorBun = useMemo(() => (
		constructorIngredients.find(ingredient => ingredient.type === TYPE_BUN)
	), [constructorIngredients]);
	
	const constructorIngredientsList = useMemo(() => (
		constructorIngredients.filter(ingredient => ingredient.type !== TYPE_BUN)
	), [constructorIngredients]);
	
	const price = useMemo(() => {
		const sumList = constructorIngredientsList.reduce((acc, curr) => acc + curr.price, 0);
		const sumBun = (constructorBun?.price || 0) * 2;
		
		return sumList + sumBun;
	}, [constructorIngredientsList, constructorBun]);
	
	const handleCloseOrderDetails = () => {
		setOrderNumber(null);
	};
	
	const handleOrderClick = () => {
		getOrder([
			constructorBun._id,
			...constructorIngredientsList.map(ingredient => ingredient._id)
		])
			.then(res => setOrderNumber(res.order.number))
	};
	
	return (
		<>
			<div className={styles.root}>
				{
					constructorIngredients &&
					constructorIngredients.length > 0 && (
						<>
							<div className={classNames(styles.wrapper, 'pt-15')}>
								<div className={styles.listItem}>
									{constructorBun && (
										<ConstructorElement
											type="top"
											isLocked
											text={constructorBun.name}
											thumbnail={constructorBun.image}
											price={constructorBun.price}
										/>
									)}
								</div>
								<ul className={classNames(styles.list, 'custom-scroll')}>
									{
										constructorIngredientsList &&
										constructorIngredientsList.length > 0 &&
										constructorIngredientsList.map(ingredient => (
											<li
												key={ingredient._id}
												className={styles.listItem}
											>
												<DragIcon type="primary"/>
												<ConstructorElement
													text={ingredient.name}
													thumbnail={ingredient.image}
													price={ingredient.price}
												/>
											</li>
										))
									}
								</ul>
								<div className={styles.listItem}>
									{constructorBun && (
										<ConstructorElement
											type="bottom"
											isLocked
											text={constructorBun.name}
											thumbnail={constructorBun.image}
											price={constructorBun.price}
										/>
									)}
								</div>
							</div>
							<div className={classNames(styles.footer, 'mt-10')}>
								<div className={classNames(styles.price, 'mr-10')}>
									<span className="text text_type_digits-medium">{price}</span>
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
						</>
					)}
			</div>
			
			{orderNumber && (
				<Modal
					onClose={handleCloseOrderDetails}
				>
					<OrderDetails number={orderNumber}/>
				</Modal>
			)}
		</>
	);
});

export default BurgerConstructor;