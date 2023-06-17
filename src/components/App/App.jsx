import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredient from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import styles from './App.module.css';

const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader/>
			
			<main className="pt-10 pb-10">
				<div className="container">
					<div className={styles.wrapper}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredient/>
							<BurgerConstructor/>
						</DndProvider>
					</div>
				</div>
			</main>
		</div>
	);
};

export default App;
