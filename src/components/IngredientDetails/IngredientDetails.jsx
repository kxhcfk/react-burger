import PropTypes from 'prop-types';

import { memo } from 'react';

import { INGREDIENT_TYPE } from '../../utils/constatns';

import styles from './IngredientDetails.module.css';
import classNames from 'classnames';

const IngredientDetails = memo(({ ingredient }) => {
	return (
		<div className={styles.root}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className={classNames(styles.image, 'mb-4 pl-5 pr-5')}
				width="480"
				height="240"
			/>
			<h3 className={classNames(styles.title, 'text text_type_main-medium mb-8')}>{ingredient.name}</h3>
			<ul className={styles.info}>
				<li className={styles.infoItem}>
					<span className="text text_type_main-default mb-2">Калории,ккал</span>
					<span className="text text_type_digits-default">{ingredient.calories}</span>
				</li>
				<li className={styles.infoItem}>
					<span className="text text_type_main-default mb-2">Белки, г</span>
					<span className="text text_type_digits-default">{ingredient.proteins}</span>
				</li>
				<li className={styles.infoItem}>
					<span className="text text_type_main-default mb-2">Жиры, г</span>
					<span className="text text_type_digits-default">{ingredient.fat}</span>
				</li>
				<li className={styles.infoItem}>
					<span className="text text_type_main-default mb-2">Углеводы, г</span>
					<span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
				</li>
			</ul>
		</div>
	);
});

IngredientDetails.propTypes = {
	ingredient: PropTypes.shape(INGREDIENT_TYPE).isRequired,
};

export default IngredientDetails;