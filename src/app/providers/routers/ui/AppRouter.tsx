import { Suspense, memo, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
	AppRouteProps,
	routeConfig,
} from 'shared/config/configRouter/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRouteProps) => {
		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.authOnly ? (
						<RequireAuth>{route.element}</RequireAuth>
					) : (
						route.element
					)
				}
			/>
		);
	}, []);
	return (
		<Suspense fallback={<PageLoader />}>
			<div className="page-wrapper">
				<Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
			</div>
		</Suspense>
	);
};

export default memo(AppRouter);
