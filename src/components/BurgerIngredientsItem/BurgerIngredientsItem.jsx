import PropTypes from 'prop-types';
import classNames from 'classnames';

import { memo, useContext, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { INGREDIENT_TYPE } from '../../utils/types';

import styles from './BurgerIngredientsItem.module.css';
import { OrderContext } from '../../services/context/order';
import { TYPE_BUN } from '../../utils/constatns';

const BurgerIngredientsItem = memo(({ ingredient, handleOpenIngredientDetail }) => {
	const { constructorIngredients, setConstructorIngredients } = useContext(OrderContext);
	const [count, setCount] = useState(0);
	const isBun = ingredient.type === TYPE_BUN;
	
	const onClick = () => {
		setCount(isBun ? 1 : count + 1);
		
		const oldConstructorIngredients = isBun ?
			constructorIngredients.filter(i => i.type !== TYPE_BUN) :
			constructorIngredients
		
		setConstructorIngredients([
			...oldConstructorIngredients,
			ingredient,
		]);
		
		handleOpenIngredientDetail(ingredient);
	};
	
	return (
		<li
			className={styles.root}
			onClick={onClick}
		>
			<div className={styles.top}>
				{count > 0 && (
					<Counter count={count}/>
				)}
				<div className={styles.image}>
					<img
						src={ingredient.image}
						alt={ingredient.name}
					/>
				</div>
				<span className={classNames(styles.price, 'pt-1 pb-1')}>
					<span className="text text_type_digits-default mr-2">{ingredient.price}</span>
					<CurrencyIcon type="primary"/>
				</span>
			</div>
			<div className={styles.bottom}>
				<span className="text text_type_main-default">{ingredient.name}</span>
			</div>
		</li>
	);
});

BurgerIngredientsItem.propTypes = {
	ingredient: PropTypes.shape(INGREDIENT_TYPE).isRequired,
	handleOpenIngredientDetail: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;