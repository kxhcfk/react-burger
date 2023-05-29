import React, { useState } from 'react';

import styles from './App.module.css';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredient from "../BurgerIngredients/BurgerIngredients";
import { data } from "../../utils/data";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App = () => {
	const [ingredients, setIngredients] = useState(data);
	const [constructorIngredients, setConstructorIngredients] = useState([]);
	
	const updateConstructorIngredients = (ingredient) => {
		setConstructorIngredients([
			...constructorIngredients,
			ingredient
		]);
	}
	
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
						<BurgerConstructor constructorIngredients={constructorIngredients}/>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
