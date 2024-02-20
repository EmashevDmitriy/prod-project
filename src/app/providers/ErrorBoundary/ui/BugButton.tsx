import { Button } from 'shared/ui/Button/Button';
import { useEffect, useState } from 'react';

//Test component for try error boundary
export const BugButton = () => {
	const [error, setError] = useState(false);

	const onThrow = () => setError(true);

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <Button onClick={onThrow}>{'trow error'}</Button>;
};
