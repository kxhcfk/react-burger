import PropTypes from 'prop-types';
import classNames from 'classnames';

import React, { memo, useCallback, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { INGREDIENT_TYPE } from '../../utils/types';
import { burgerTypes } from '../../utils/constatns';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = memo(({ ingredients }) => {
	const [activeTab, setActiveTab] = useState(burgerTypes[0].type);
	const [ingredientDetail, setIngredientDetail] = useState(null);
	
	const onClickTab = (type) => {
		setActiveTab(type);
	};
	
	const handleCloseIngredientDetail = useCallback(() => {
		setIngredientDetail(null);
	}, []);
	
	const handleOpenIngredientDetail = useCallback((ingredient) => {
		setIngredientDetail(ingredient);
	}, []);
	
	return (
		<>
			<section className={styles.root}>
				<div className="container">
					<div className={styles.top}>
						<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
						<div className={classNames(styles.tabs, 'mb-10')}>
							{
								burgerTypes.length > 0 &&
								burgerTypes.map(tab => (
									<Tab
										key={tab.type}
										active={activeTab === tab.type}
										value={tab.type}
										onClick={() => onClickTab(tab.type)}
									>
										{tab.title}
									</Tab>
								))
							}
						</div>
					</div>
					<div className={classNames(styles.list, 'custom-scroll')}>
						{
							burgerTypes.length > 0 &&
							burgerTypes.map(tab => (
								<BurgerIngredientsSection
									key={tab.type}
									type={tab.type}
									title={tab.title}
									ingredients={ingredients}
									handleOpenIngredientDetail={handleOpenIngredientDetail}
								/>
							))
						}
					</div>
				</div>
			</section>
			
			{ingredientDetail && (
				<Modal
					title="Детали ингредиента"
					onClose={handleCloseIngredientDetail}
				>
					<IngredientDetails ingredient={ingredientDetail}/>
				</Modal>
			)}
		</>
	);
});

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.shape(INGREDIENT_TYPE).isRequired).isRequired,
};

export default BurgerIngredients;