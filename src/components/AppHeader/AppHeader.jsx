import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

const AppHeader = () => {
	return (
		<header className={classNames(styles.root, "pt-4 pb-4")}>
			<div className="container">
				<div className={styles.wrapper}>
					<nav>
						<ul className={styles.nav}>
							<li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
								<BurgerIcon type="primary"/>
								<span className="text text_type_main-default ml-2">Конструктор</span>
							</li>
							<li className={`${styles.item} pt-4 pb-4 pr-5 pl-5`}>
								<ListIcon type="secondary"/>
								<span className="text text_type_main-default color_secondary ml-2">Лента заказов</span>
							</li>
						</ul>
					</nav>
					<div className={styles.logo}>
						<Logo/>
					</div>
					<div className={classNames(styles.item, styles.profile)}>
						<ProfileIcon type="secondary"/>
						<span className="text text_type_main-default color_secondary ml-2">Личный кабинет</span>
					</div>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;