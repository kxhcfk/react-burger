import PropTypes from 'prop-types';
import classNames from 'classnames';

import { memo, useState } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { INGREDIENT_TYPE } from '../../utils/constatns';

import styles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = memo(({ ingredient, updateConstructorIngredients, handleOpenIngredientDetail }) => {
	const [count, setCount] = useState(0);
	
	const onClick = () => {
		setCount(count + 1);
		updateConstructorIngredients(ingredient);
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
	updateConstructorIngredients: PropTypes.func.isRequired,
	handleOpenIngredientDetail: PropTypes.func.isRequired,
};

export default BurgerIngredientsItem;