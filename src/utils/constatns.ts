import { TIngredient } from "../types/TIngredient";
import { TWsOrder, TWsOrderMessage } from "../types/TOrder";
import { TUser } from "../types/TUser";

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
	feed: '/feed',
	feedDetails: '/feed/:id',
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

export const WS_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_USER_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const ingredientTest: TIngredient = {
	_id: '643d69a5c3f7b9001cfa093d',
	name: 'Флюоресцентная булка R2-D3',
	type: 'bun',
	proteins: 44,
	fat: 26,
	carbohydrates: 85,
	calories: 643,
	price: 988,
	image: 'https://code.s3.yandex.net/react/code/bun-01.png',
	image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
	image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
	__v: 0
}

export const wsOrderTest: TWsOrder = {
	"_id": "64e06b3282e277001bfa9c3d",
	"ingredients": [
		"643d69a5c3f7b9001cfa093d"
	],
	"status": "done",
	"name": "Флюоресцентный бургер",
	"createdAt": "2023-08-19T07:11:46.465Z",
	"updatedAt": "2023-08-19T07:11:46.618Z",
	"number": 17080,
}

export const userTest: TUser = {
	name: "test",
	password: "testpass",
	email: "test@test.com",
}

export const wsOrderMessageTest: TWsOrderMessage = {
	orders: [wsOrderTest, wsOrderTest],
	total: 123,
	totalToday: 123,
}