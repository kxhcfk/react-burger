import { useCallback, useState } from 'react';

type TUseModalReturn = {
	isModalOpen: boolean,
	openModal: () => void,
	closeModal: () => void,
}

const useModal = (): TUseModalReturn  => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const openModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);
	
	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);
	
	return {
		isModalOpen,
		openModal,
		closeModal,
	};
};

export { useModal };