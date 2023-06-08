import { useState } from 'react';

const useFetch = (callback) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	
	const fetching = async () => {
		try {
			setIsLoading(true);
			await callback()
		} catch (e) {
			setError(e.status)
		} finally {
			setIsLoading(false);
		}
	}

	return [fetching, isLoading, error];
};

export { useFetch };