import PropTypes from 'prop-types';

export const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

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

export const INGREDIENT_TYPE = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	__v: PropTypes.number.isRequired,
};