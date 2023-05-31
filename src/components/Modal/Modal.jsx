import PropTypes from 'prop-types';

import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

const Modal = memo(({ children, title, onClose }) => {
	const handleEsc = (e) => {
		if (e.code === 'Escape') {
			onClose();
		}
	};
	
	const handleModalClick = (e) => {
		e.stopPropagation();
	}
	
	useEffect(() => {
		document.addEventListener('keydown', handleEsc);
		
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, []);
	
	const modal = (
		<ModalOverlay onClose={onClose}>
			<div
				className={styles.root}
				onClick={handleModalClick}
			>
				<div className={styles.container}>
					<div className={styles.header}>
						{title && (
							<h2 className="text text_type_main-large">{title}</h2>
						)}
						<div>
							<button className={styles.close}>
								<CloseIcon
									type="primary"
									onClick={onClose}
								/>
							</button>
						</div>
					</div>
					{children}
				</div>
			</div>
		</ModalOverlay>
	);
	
	return createPortal(
		modal,
		document.getElementById('modals'),
	);
});

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};

export default Modal;