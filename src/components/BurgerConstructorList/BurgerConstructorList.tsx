import classNames from 'classnames';

import React, { FC, useCallback } from "react";
import { useDispatch } from 'react-redux';

import { CALC_TOTAL_PRICE, DELETE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burgerConstructor';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredientWithUuid } from "../../types/TIngredient";

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

import styles from './BurgerConstructorList.module.css';

type TBurgerConstructorListProps = {
	ingredients: TIngredientWithUuid[];
}

const BurgerConstructorList: FC<TBurgerConstructorListProps> = ({ ingredients }) => {
	const dispatch = useDispatch();
	
	const handleRemove = useCallback((id: string) => {
		dispatch({ type: DELETE_CONSTRUCTOR_INGREDIENT, payload: id });
		dispatch({ type: CALC_TOTAL_PRICE });
	}, []);
	
	return (
		<ul className={classNames(styles.list, 'custom-scroll')}>
			{ingredients.map((ingredient, index) => (
				<BurgerConstructorItem
					key={ingredient.uuid}
					index={index}
				>
					<DragIcon type="primary"/>
					<ConstructorElement
						text={ingredient.name}
						thumbnail={ingredient.image}
						price={ingredient.price}
						handleClose={() => handleRemove(ingredient.uuid)}
					/>
				</BurgerConstructorItem>
			))}
		</ul>
	);
};

export default BurgerConstructorList;