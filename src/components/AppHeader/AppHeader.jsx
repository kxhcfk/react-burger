import classNames from 'classnames';

import { memo } from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';
import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constatns';

const AppHeader = memo(() => {
	
	return (
		<header className={classNames(styles.root, 'pt-4 pb-4')}>
			<div className="container">
				<div className={styles.wrapper}>
					<nav>
						<ul className={styles.nav}>
							<li className="pt-4 pb-4 pr-5 pl-5">
								<NavLink
									to={ROUTES.main}
									className={styles.item}
									end
								>
									{({ isActive }) => (
										<>
											<BurgerIcon type={isActive ? 'primary' : 'secondary'}/>
											<span className={classNames('text text_type_main-default ml-2', !isActive && 'color_secondary')}>Конструктор</span>
										</>
									)}
								</NavLink>
							</li>
							<li className="pt-4 pb-4 pr-5 pl-5">
								<Link
									to={ROUTES.main}
									className={styles.item}
								>
									<ListIcon type="secondary"/>
									<span className="text text_type_main-default color_secondary ml-2">Лента заказов</span>
								</Link>
							</li>
						</ul>
					</nav>
					<Link
						to={ROUTES.main}
						className={styles.logo}
					>
						<Logo/>
					</Link>
					<NavLink
						to={ROUTES.profile}
						className={classNames(styles.item, styles.profile)}
						end
					>
						{({ isActive }) => (
							<>
								<ProfileIcon type={isActive ? 'primary' : 'secondary'}/>
								<span className={classNames('text text_type_main-default ml-2', !isActive && 'color_secondary')}>Личный кабинет</span>
							</>
						)}
					</NavLink>
				</div>
			</div>
		</header>
	);
});

export default AppHeader;