import React, { useCallback, useEffect, useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerIngredient from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import { URL_INGREDIENTS } from '../../utils/constatns';

import styles from './App.module.css';

const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [constructorIngredients, setConstructorIngredients] = useState([]);
	const [ingredientDetail, setIngredientDetail] = useState(null);
	const [orderNumber, setOrderNumber] = useState(null);
	
	const updateConstructorIngredients = useCallback((ingredient) => {
		setConstructorIngredients([
			...constructorIngredients,
			ingredient,
		]);
		setIngredientDetail(ingredient);
	}, [constructorIngredients]);
	
	const handleCloseIngredientDetail = useCallback(() => {
		setIngredientDetail(null);
	}, []);
	
	const handleCloseOrderDetails = useCallback(() => {
		setOrderNumber(null);
	}, []);
	
	const createOrder = useCallback((number) => {
		setOrderNumber(number);
	}, []);
	
	useEffect(() => {
		const getIngredients = async () => {
			try {
				const res = await fetch(URL_INGREDIENTS);
				const data = await res.json();
				
				setIngredients(data.data);
			} catch (e) {
				console.log(e);
			}
		};
		
		getIngredients();
	}, []);
	
	return (
		<div className={styles.app}>
			<AppHeader/>
			
			<main className="pt-10 pb-10">
				<div className="container">
					<div className={styles.wrapper}>
						<BurgerIngredient
							ingredients={ingredients}
							updateConstructorIngredients={updateConstructorIngredients}
						/>
						<BurgerConstructor
							constructorIngredients={constructorIngredients}
							createOrder={createOrder}
						/>
					</div>
				</div>
			</main>
			
			{ingredientDetail && (
				<Modal
					title="Детали ингредиента"
					onClose={handleCloseIngredientDetail}
				>
					<IngredientDetails ingredient={ingredientDetail}/>
				</Modal>
			)}
			
			{orderNumber && (
				<Modal
					onClose={handleCloseOrderDetails}
				>
					<OrderDetails number={orderNumber}/>
				</Modal>
			)}
		</div>
	);
};

export default App;
