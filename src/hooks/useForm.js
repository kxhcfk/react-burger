import { useCallback, useState } from 'react';

const useForm = (initialState = {}) => {
	const [data, setData] = useState(initialState);
	
	const handleData = useCallback((e) => (
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
	), [data]);
	
	return {
		data,
		setData,
		handleData,
	};
};

export { useForm };