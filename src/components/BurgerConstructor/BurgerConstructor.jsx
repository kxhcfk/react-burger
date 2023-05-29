import styles from './BurgerConstructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import PropTypes from "prop-types";

const BurgerConstructor = ({ constructorIngredients }) => {
	
	const calcSumPrice = () => {
		return constructorIngredients.reduce((p, c) => {
			return p += (c.type === 'bun' ? 2 : 1) * c.price
		}, 0);
	}
	
	return (
		<div className={styles.root}>
			{constructorIngredients.length > 0 && (
				<>
					<div className={classNames(styles.wrapper, "pt-15")}>
						{constructorIngredients
							.map(ingredient => {
								return ingredient.type === 'bun' && (
									<div className={styles.listItem}>
										<ConstructorElement
											type="top"
											isLocked={true}
											text={ingredient.name}
											thumbnail={ingredient.image}
											price={ingredient.price}
										/>
									</div>
								)
							})
						}
						<ul className={classNames(styles.list, "custom-scroll")}>
							{constructorIngredients.map(ingredient => {
								return ingredient.type !== 'bun' && (
									<li
										key={ingredient._id}
										className={styles.listItem}
									>
										<DragIcon type="primary"/>
										<ConstructorElement
											text={ingredient.name}
											thumbnail={ingredient.image}
											price={ingredient.price}
										/>
									</li>
								)
							})}
						</ul>
						{constructorIngredients
							.map(ingredient => {
								return ingredient.type === 'bun' && (
									<div className={styles.listItem}>
										<ConstructorElement
											type="bottom"
											isLocked={true}
											text={ingredient.name}
											thumbnail={ingredient.image}
											price={ingredient.price}
										/>
									</div>
								)
							})
						}
					</div>
					<div className={classNames(styles.footer, "mt-10")}>
						<div className={classNames(styles.price, "mr-10")}>
							<span className="text text_type_digits-medium">{calcSumPrice()}</span>
							<CurrencyIcon type="primary"/>
						</div>
						<Button
							htmlType="button"
							type="primary"
							size="large"
						>
							Оформить заказ
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

BurgerConstructor.propTypes = {
	constructorIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerConstructor;