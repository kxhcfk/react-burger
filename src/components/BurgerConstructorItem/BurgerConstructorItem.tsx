import React, { FC, useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { Identifier, XYCoord } from "dnd-core";

import { SORT_CONSTRUCTOR_INGREDIENT } from "../../services/actions/burgerConstructor";

import styles from "./BurgerConstructorItem.module.css";

type TBurgerConstructorItemProps = {
    index: number;
    children: React.ReactNode;
}

type DragItem = {
    index: number;
    id: string;
    type: string;
}

const BurgerConstructorItem: FC<TBurgerConstructorItemProps> = ({ children, index }) => {
    const dispatch = useDispatch();
    
    const ref = useRef<HTMLLIElement>(null);
    
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: "burgerIngredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = index;
            
            if (dragIndex === hoverIndex) return;
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
            
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
        type: "burgerIngredient",
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

export default BurgerConstructorItem;