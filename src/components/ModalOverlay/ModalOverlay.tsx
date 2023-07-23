import React, { FC, memo } from "react";

import styles from './ModalOverlay.module.css';

type TModalOverlayProps = {
	onClose: () => void;
	children: React.ReactNode;
}

const ModalOverlay: FC<TModalOverlayProps> = memo(({ children, onClose }) => {
	return (
		<div
			className={styles.root}
			onClick={onClose}
		>
			{children}
		</div>
	);
});

export default ModalOverlay;