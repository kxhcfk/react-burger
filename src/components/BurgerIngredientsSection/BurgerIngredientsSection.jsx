import styles from './BurgerIngredientsSection.module.css'
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import PropTypes from "prop-types";

const BurgerIngredientsSection = ({ ingredients, title, type, updateConstructorIngredients }) => {
	return (
		<div className={styles.root}>
			<h2 className="text text_type_main-medium mb-6">{title}</h2>
			
			<ul className={styles.list}>
				{ingredients.length && ingredients
					.filter(ingredient => ingredient.type === type)
					.map(ingredient => (
						<BurgerIngredientsItem
							key={ingredient._id}
							ingredient={ingredient}
							updateConstructorIngredients={updateConstructorIngredients}
						/>
					))
				}
			</ul>
		</div>
	);
};

BurgerIngredientsSection.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	updateConstructorIngredients: PropTypes.func.isRequired,
}

export default BurgerIngredientsSection;