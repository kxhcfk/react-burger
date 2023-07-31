import classNames from 'classnames';

import { FC, memo } from "react";

import styles from './OrderDetails.module.css';

import doneImage from '../../images/done.png';

type TOrderDetailsProps = {
	number: number;
}

const OrderDetails: FC<TOrderDetailsProps> = memo(({ number }) => {
	return (
		<div className={classNames(styles.root, 'pb-15')}>
			<h2 className={classNames(styles.number, 'text text_type_digits-large mt-4 mb-8')}>{number}</h2>
			<p className="text text_type_main-medium">идентификатор заказа</p>
			<img
				src={doneImage}
				alt="Done"
				className={classNames(styles.image, 'mt-15 mb-15')}
				width="120"
				height="120"
			/>
			<p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
			<p className="text text_type_main-default text_color_inactive">
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
});

export default OrderDetails;