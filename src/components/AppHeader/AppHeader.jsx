import classNames from 'classnames';

import { memo } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const AppHeader = memo(() => {
	return (
		<header className={classNames(styles.root, 'pt-4 pb-4')}>
			<div className="container">
				<div className={styles.wrapper}>
					<nav>
						<ul className={styles.nav}>
							<li className="pt-4 pb-4 pr-5 pl-5">
								<a
									href="/"
									className={styles.item}
								>
									<BurgerIcon type="primary"/>
									<span className="text text_type_main-default ml-2">Конструктор</span>
								</a>
							</li>
							<li className="pt-4 pb-4 pr-5 pl-5">
								<a
									href="/"
									className={styles.item}
								>
									<ListIcon type="secondary"/>
									<span className="text text_type_main-default color_secondary ml-2">Лента заказов</span>
								</a>
							</li>
						</ul>
					</nav>
					<a
						href="/"
						className={styles.logo}
					>
						<Logo/>
					</a>
					<a
						href="/"
						className={classNames(styles.item, styles.profile)}
					>
						<ProfileIcon type="secondary"/>
						<span className="text text_type_main-default color_secondary ml-2">Личный кабинет</span>
					</a>
				</div>
			</div>
		</header>
	);
});

export default AppHeader;