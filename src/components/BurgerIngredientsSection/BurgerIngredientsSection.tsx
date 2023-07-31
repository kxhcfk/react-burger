import { FC, forwardRef, memo, RefObject, useMemo } from "react";
import { TIngredient } from "../../types/TIngredient";

import BurgerIngredientsItem from '../BurgerIngredientsItem/BurgerIngredientsItem';

import styles from './BurgerIngredientsSection.module.css';

type TBurgerIngredientsSectionProps = {
	ingredients: TIngredient[];
	title: string;
	type: string;
	ref: RefObject<HTMLDivElement>;
}

const BurgerIngredientsSection: FC<TBurgerIngredientsSectionProps> = memo(forwardRef(({ ingredients, title, type }, ref) => {
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

export default BurgerIngredientsSection;