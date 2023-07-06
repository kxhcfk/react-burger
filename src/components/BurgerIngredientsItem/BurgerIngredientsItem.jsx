import PropTypes from 'prop-types';
import classNames from 'classnames';

import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import { DELETE_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from '../../services/actions/ingredient';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import { useModal } from '../../hooks/useModal';

import { INGREDIENT_TYPE } from '../../utils/types';

import styles from './BurgerIngredientsItem.module.css';

const BurgerIngredientsItem = memo(({ ingredient }) => {
	const dispatch = useDispatch();
	
	const { isModalOpen, openModal, closeModal } = useModal();
	
	const onClick = () => {
		dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredient });
		openModal();
	};
	
	const handleCloseIngredientDetail = useCallback(() => {
		closeModal();
		dispatch({ type: DELETE_CURRENT_INGREDIENT });
	}, []);
	
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
		<>
			<li
				className={styles.root}
				onClick={onClick}
				ref={dragRef}
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
			</li>
			
			{!!isModalOpen && (
				<Modal
					title="Детали ингредиента"
					onClose={handleCloseIngredientDetail}
				>
					<IngredientDetails/>
				</Modal>
			)}
		</>
	);
});

BurgerIngredientsItem.propTypes = {
	ingredient: PropTypes.shape(INGREDIENT_TYPE).isRequired,
};

export default BurgerIngredientsItem;