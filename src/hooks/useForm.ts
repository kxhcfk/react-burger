import { ChangeEvent, useCallback, useState } from "react";

const useForm = <T>(initialState: T) => {
	const [data, setData] = useState<T>(initialState);
	
	const handleData = useCallback((e: ChangeEvent<HTMLInputElement>) => (
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