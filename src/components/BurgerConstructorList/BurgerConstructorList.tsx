import classNames from 'classnames';

import React, { FC, useCallback } from "react";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
	calcTotalPriceAction,
	deleteConstructorIngredientAction,
} from "../../store/actions/burgerConstructor";
import { useDispatch } from "../../store/store";
import { TIngredientWithUuid } from "../../types/TIngredient";

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

import styles from './BurgerConstructorList.module.css';

type TBurgerConstructorListProps = {
	ingredients: TIngredientWithUuid[];
}

const BurgerConstructorList: FC<TBurgerConstructorListProps> = ({ ingredients }) => {
	const dispatch = useDispatch();
	
	const handleRemove = useCallback((id: string) => {
		dispatch(deleteConstructorIngredientAction(id));
		dispatch(calcTotalPriceAction());
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