import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';
import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

import { INGREDIENT_TYPE } from '../../utils/types';

import styles from './BurgerIngredientsSection.module.css';

const BurgerIngredientsSection = memo(({ ingredients, title, type, handleOpenIngredientDetail }) => {
	const ingredientsList = useMemo(() => {
		return ingredients.filter(ingredient => ingredient.type === type);
	}, [ingredients, type]);
	
	return (
		<div className={styles.root}>
			<h2 className="text text_type_main-medium mb-6">{title}</h2>
			
			<ul className={styles.list}>
				{
					ingredientsList &&
					ingredientsList.length > 0 &&
					ingredientsList.map(ingredient => (
						<BurgerIngredientsItem
							key={ingredient._id}
							ingredient={ingredient}
							handleOpenIngredientDetail={handleOpenIngredientDetail}
						/>
					))
				}
			</ul>
		</div>
	);
});

BurgerIngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	handleOpenIngredientDetail: PropTypes.func.isRequired,
};

export default BurgerIngredientsSection;