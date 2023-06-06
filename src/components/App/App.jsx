import React, { useEffect, useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredient from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { getIngredients } from '../../utils/api';

import styles from './App.module.css';
import { OrderContext } from '../../services/context/order';

const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [constructorIngredients, setConstructorIngredients] = useState([]);
	
	useEffect(() => {
		getIngredients()
			.then(res => setIngredients(res.data));
	}, []);
	
	return (
		<div className={styles.app}>
			<AppHeader/>
			
			<main className="pt-10 pb-10">
				<div className="container">
					<div className={styles.wrapper}>
						<OrderContext.Provider
							value={{
								constructorIngredients,
								setConstructorIngredients,
							}}
						>
							<BurgerIngredient
								ingredients={ingredients}
							/>
							<BurgerConstructor/>
						</OrderContext.Provider>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
