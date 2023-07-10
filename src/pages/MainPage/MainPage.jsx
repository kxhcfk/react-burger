import styles from './MainPage.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredient from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

const MainPage = () => {
	return (
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
	);
};

export default MainPage;