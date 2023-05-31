import classNames from 'classnames';
import PropTypes from 'prop-types';

import { memo, useCallback, useMemo } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { INGREDIENT_TYPE, TYPE_BUN } from '../../utils/constatns';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = memo(({ constructorIngredients, createOrder }) => {
	const price = useMemo(() => {
		return constructorIngredients.reduce((p, c) => {
			return p += (c.type === TYPE_BUN ? 2 : 1) * c.price;
		}, 0);
	}, [constructorIngredients]);
	
	const constructorBun = useMemo(() => {
		return constructorIngredients.find(item => item.type === TYPE_BUN);
	}, [constructorIngredients]);
	
	const constructorIngredientsList = useMemo(() => {
		return constructorIngredients.filter(ingredient => ingredient.type !== TYPE_BUN);
	}, [constructorIngredients]);
	
	const handleOrderClick = useCallback(() => {
		createOrder(1034536);
	}, [createOrder]);
	
	return (
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
	);
});

BurgerConstructor.propTypes = {
	constructorIngredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
};

export default BurgerConstructor;