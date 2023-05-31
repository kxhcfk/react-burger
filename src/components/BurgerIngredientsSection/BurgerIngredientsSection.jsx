import styles from './BurgerIngredientsSection.module.css'
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import PropTypes from "prop-types";
import { INGREDIENT_TYPE } from "../../utils/constatns";
import { useMemo } from "react";

const BurgerIngredientsSection = ({ ingredients, title, type, updateConstructorIngredients }) => {
	const ingredientsList = useMemo(() => {
		return ingredients
			.filter(ingredient => ingredient.type === type)
			.map(ingredient => (
				<BurgerIngredientsItem
					key={ingredient._id}
					ingredient={ingredient}
					updateConstructorIngredients={updateConstructorIngredients}
				/>
			))
	}, [ingredients, type, updateConstructorIngredients])
	
	return (
		<div className={styles.root}>
			<h2 className="text text_type_main-medium mb-6">{title}</h2>
			
			<ul className={styles.list}>
				{ingredientsList && ingredientsList}
			</ul>
		</div>
	);
};

BurgerIngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	updateConstructorIngredients: PropTypes.func.isRequired,
}

export default BurgerIngredientsSection;