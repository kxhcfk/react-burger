import classNames from 'classnames';

import { memo } from 'react';
import { useSelector } from 'react-redux';

import styles from './IngredientDetails.module.css';

const IngredientDetails = memo(() => {
	const { currentIngredient: ingredient } = useSelector(store => store.currentIngredient);
	
	return (
		<>
			{ingredient && (
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
			)}
		</>
	);
});

export default IngredientDetails;