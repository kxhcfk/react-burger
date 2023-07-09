export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const ROUTES = {
	main: '/',
	login: '/login',
	register: '/register',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	profile: '/profile',
	profileOrders: '/profile/orders',
	profileOrderDetails: '/profile/orders/:id',
	ingredientDetails: '/ingredients/:id',
	notFound: '/*',
}

export const TYPE_BUN = 'bun';
export const TYPE_SAUCE = 'sauce';
export const TYPE_MAIN = 'main';

export const burgerTypes = [
	{
		type: TYPE_BUN,
		title: 'Булки',
	},
	{
		type: TYPE_SAUCE,
		title: 'Соусы',
	},
	{
		type: TYPE_MAIN,
		title: 'Начинки',
	},
];