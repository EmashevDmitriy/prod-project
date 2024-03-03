import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../index';
import { StateScheme } from '../config/StateScheme';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateScheme;
}

export const StoreProvider = ({
	children,
	initialState,
}: StoreProviderProps) => {
	const store = createReduxStore(initialState);
	return <Provider store={store}>{children}</Provider>;
};
