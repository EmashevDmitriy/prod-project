import { getUserAuthData } from 'entities/User';
import { Suspense, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/configRouter/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

const AppRouter = () => {
	const isAuth = useSelector(getUserAuthData);

	const routes = useMemo(() => {
		return Object.values(routeConfig).filter(route => {
			if (route.authOnly && !isAuth) {
				return false;
			}
			return true;
		});
	}, [isAuth]);

	return (
		<Suspense fallback={<PageLoader />}>
			<div className="page-wrapper">
				<Routes>
					{routes.map(({ element, path }) => (
						<Route key={path} element={element} path={path} />
					))}
				</Routes>
			</div>
		</Suspense>
	);
};

export default memo(AppRouter);
