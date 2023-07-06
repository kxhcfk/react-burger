import PropTypes from 'prop-types';
import classNames from 'classnames';

import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CALC_TOTAL_PRICE, DELETE_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burgerConstructor';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from '../BurgerConstructorItem/BurgerConstructorItem';

import { INGREDIENT_TYPE } from '../../utils/types';

import styles from './BurgerConstructorList.module.css';

const BurgerConstructorList = ({ ingredients }) => {
	const dispatch = useDispatch();
	
	const handleRemove = useCallback((id) => {
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

BurgerConstructorList.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
}

export default BurgerConstructorList;