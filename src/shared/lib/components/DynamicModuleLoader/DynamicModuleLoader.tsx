import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateSchemeKeys } from 'app/providers/StoreProvider/config/StateScheme';
import { AppDispatch } from 'app/providers/StoreProvider/config/store';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
	[name in StateSchemeKeys]?: Reducer;
};

type ReducersListEntry = [StateSchemeKeys, Reducer];

interface DynamicModuleLoaderProps {
	children: ReactNode;
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = ({
	children,
	reducers,
	removeAfterUnmount,
}: DynamicModuleLoaderProps) => {
	const store = useStore() as ReduxStoreWithManager;
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
			store.reducerManager.add(name, reducer);
			dispatch({ type: `@INIT ${name} reducer` });
		});

		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([name]: ReducersListEntry) => {
					store.reducerManager.remove(name);
					dispatch({ type: `@DESTROY ${name} reducer` });
				});
			}
		};
		//eslint-disable-next-line
	}, []);
	return <>{children}</>;
};
