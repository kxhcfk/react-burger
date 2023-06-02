import React, { useEffect, useState } from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredient from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { getIngredients } from '../../utils/api';

import styles from './App.module.css';

const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [constructorIngredients, setConstructorIngredients] = useState([]);
	
	const updateConstructorIngredients = (ingredient) => {
		setConstructorIngredients([
			...constructorIngredients,
			ingredient,
		]);
	};
	
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
						<BurgerIngredient
							ingredients={ingredients}
							updateConstructorIngredients={updateConstructorIngredients}
						/>
						<BurgerConstructor
							constructorIngredients={constructorIngredients}
						/>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
