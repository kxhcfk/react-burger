import PropTypes from 'prop-types';

import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { SORT_CONSTRUCTOR_INGREDIENT } from '../../services/actions/burgerConstructor';

import styles from './BurgerConstructorItem.module.css';

const BurgerConstructorItem = ({ children, index }) => {
	const dispatch = useDispatch();
	
	const ref = useRef(null);
	
	const [{ handlerId }, drop] = useDrop({
		accept: 'burgerIngredient',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) return;
			
			const dragIndex = item.index;
			const hoverIndex = index;
			
			if (dragIndex === hoverIndex) return;
			
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
			
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
			
			dispatch({
				type: SORT_CONSTRUCTOR_INGREDIENT,
				payload: {
					dragIndex,
					hoverIndex,
				},
			});
			
			item.index = hoverIndex;
		},
	});
	
	const [, drag] = useDrag({
		type: 'burgerIngredient',
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	
	drag(drop(ref));
	
	return (
		<li
			className={styles.root}
			ref={ref}
			data-handler-id={handlerId}
		>
			{children}
		</li>
	);
};

BurgerConstructorItem.propTypes = {
	index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;