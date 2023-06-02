import PropTypes from 'prop-types';

import { memo } from 'react';

import styles from './ModalOverlay.module.css';

const ModalOverlay = memo(({ children, onClose }) => {
	return (
		<div
			className={styles.root}
			onClick={onClose}
		>
			{children}
		</div>
	);
});

ModalOverlay.propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;