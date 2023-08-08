import classNames from 'classnames';

import { FC, memo } from "react";
import { useDrag } from 'react-dnd';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from "../../types/TIngredient";

import styles from './BurgerIngredientsItem.module.css';
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from '../../utils/constatns';

type TBurgerIngredientsItemProps = {
	ingredient: TIngredient;
}

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = memo(({ ingredient }) => {
	const location = useLocation();
	
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: {
			ingredient,
		},
		collect: monitor => ({
			isDrag: monitor.isDragging(),
		}),
	});
	
	return (
		<li
			ref={dragRef}
		>
			<Link
				className={styles.root}
				to={ROUTES.ingredientDetails.replace(':id', ingredient._id)}
				state={{ background: location }}
			>
				<div className={styles.top}>
					<Counter count={0}/>
					<div
						className={styles.image}
					>
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
			</Link>
		</li>
	);
});

export default BurgerIngredientsItem;