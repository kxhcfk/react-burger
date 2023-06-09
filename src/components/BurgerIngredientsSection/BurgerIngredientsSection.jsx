import PropTypes from 'prop-types';

import { forwardRef, memo, useMemo } from 'react';

import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

import { INGREDIENT_TYPE } from '../../utils/types';

import styles from './BurgerIngredientsSection.module.css';

const BurgerIngredientsSection = memo(forwardRef(({ ingredients, title, type }, ref) => {
	const ingredientsList = useMemo(() => {
		return ingredients.filter(ingredient => ingredient.type === type);
	}, [ingredients, type]);
	
	return (
		<div
			className={styles.root}
			ref={ref}
			id={type}
		>
			<h2 className="text text_type_main-medium mb-6">{title}</h2>
			
			<ul className={styles.list}>
				{
					!!ingredientsList.length &&
					ingredientsList.map(ingredient => (
						<BurgerIngredientsItem
							key={ingredient._id}
							ingredient={ingredient}
						/>
					))
				}
			</ul>
		</div>
	);
}));

BurgerIngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
};

export default BurgerIngredientsSection;