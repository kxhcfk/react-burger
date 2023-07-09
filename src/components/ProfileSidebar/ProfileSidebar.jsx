import styles from './ProfileSidebar.module.css';
import { ROUTES } from '../../utils/constatns';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/auth';

const links = [
	{
		url: ROUTES.profile,
		title: 'Профиль',
	},
	{
		url: ROUTES.profileOrders,
		title: 'История заказов',
	},
];

const ProfileSidebar = () => {
	const dispatch = useDispatch();
	
	const activeClass = ({ isActive }) => (
		classNames(styles.link, 'text text_type_main-medium', !isActive && 'text_color_inactive')
	);
	
	const handleLogoutClick = () => {
		dispatch(logout());
	};
	
	return (
		<aside className={classNames(styles.root, 'mr-15')}>
			<ul>
				{links.map((link, i) => (
					<li key={i}>
						<NavLink
							className={activeClass}
							to={link.url}
							end
						>
							{link.title}
						</NavLink>
					</li>
				))}
				<li>
					<button
						className={classNames(styles.link, 'text text_type_main-medium text_color_inactive')}
						onClick={handleLogoutClick}
					>
						Выход
					</button>
				</li>
			</ul>
			
			<p className={classNames(styles.text, 'text text_type_main-default mt-20')}>
				В этом разделе вы можете
				изменить свои персональные данные
			</p>
		</aside>
	);
};

export default ProfileSidebar;