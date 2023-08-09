import classNames from 'classnames';

import React, { FC, memo, useCallback, useEffect, useRef, useState } from "react";


import { getIngredients } from '../../store/actions/ingredients';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "../../store/store";

import BurgerIngredientsSection from '../BurgerIngredientsSection/BurgerIngredientsSection';

import { burgerTypes, TYPE_BUN, TYPE_MAIN, TYPE_SAUCE } from '../../utils/constatns';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients: FC = memo(() => {
	const dispatch = useDispatch();
	
	const { ingredients } = useSelector(store => store.ingredients);
	
	const [activeTab, setActiveTab] = useState(burgerTypes[0].type);
	
	const rootRef = useRef<HTMLDivElement>(null);
	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	
	const handleScroll = useCallback(() => {
		const rootTop = rootRef.current?.getBoundingClientRect().top;
		
		if (!rootTop) return;
		
		const distance = {
			TYPE_BUN: Math.abs(rootTop - (bunRef.current as HTMLDivElement)?.getBoundingClientRect()?.top),
			TYPE_SAUCE: Math.abs(rootTop - (sauceRef.current as HTMLDivElement)?.getBoundingClientRect().top),
			TYPE_MAIN: Math.abs(rootTop - (mainRef.current as HTMLDivElement)?.getBoundingClientRect().top),
		};
		
		const minDistance = Math.min(distance.TYPE_BUN, distance.TYPE_SAUCE, distance.TYPE_MAIN);
		
		const result = minDistance === distance.TYPE_BUN
			? TYPE_BUN
			: minDistance === distance.TYPE_SAUCE
				? TYPE_SAUCE
				: TYPE_MAIN;
		
		setActiveTab(result);
	}, []);
	
	const handleTabClick = useCallback((type: string) => {
		setActiveTab(type);
		
		switch (type) {
			case TYPE_BUN: {
				bunRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			}
			case TYPE_SAUCE: {
				sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			}
			case TYPE_MAIN: {
				mainRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			}
		}
	}, []);
	
	return (
		<>
			<section className={styles.root}>
				<div className="container">
					<div className={styles.top}>
						<h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
						<div className={classNames(styles.tabs, 'mb-10')}>
							{
								!!burgerTypes.length &&
								burgerTypes.map(tab => (
									<Tab
										key={tab.type}
										active={activeTab === tab.type}
										value={tab.type}
										onClick={handleTabClick}
									>
										{tab.title}
									</Tab>
								))
							}
						</div>
					</div>
					<div
						className={classNames(styles.list, 'custom-scroll')}
						ref={rootRef}
						onScroll={handleScroll}
					>
						<BurgerIngredientsSection
							type={TYPE_BUN}
							title="Булки"
							ref={bunRef}
							ingredients={ingredients}
						/>
						<BurgerIngredientsSection
							type={TYPE_SAUCE}
							title="Соусы"
							ref={sauceRef}
							ingredients={ingredients}
						/>
						<BurgerIngredientsSection
							type={TYPE_MAIN}
							title="Начинки"
							ref={mainRef}
							ingredients={ingredients}
						/>
					</div>
				</div>
			</section>
		</>
	);
});

export default BurgerIngredients;