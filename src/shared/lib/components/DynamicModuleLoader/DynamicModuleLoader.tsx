import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemeKeys } from 'app/providers/StoreProvider/config/StateScheme';
import { ReactNode, useEffect } from 'react';
import { useStore } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export type ReducersList = {
	[name in StateSchemeKeys]?: Reducer;
};

interface DynamicModuleLoaderProps {
	children: ReactNode;
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
	children,
	reducers,
	removeAfterUnmount = true,
}: DynamicModuleLoaderProps) => {
	const store = useStore() as ReduxStoreWithManager;
	const dispatch = useAppDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]) => {
			store.reducerManager.add(name as StateSchemeKeys, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]) => {
					store.reducerManager.remove(name as StateSchemeKeys);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		//eslint-disable-next-line
	}, []);
	return <>{children}</>;
};
