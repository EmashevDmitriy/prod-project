import { AboutPage } from 'pages/AboutPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

type AppRouteProps = RouteProps & {
	authOnly?: boolean;
};

export enum AppRouters {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	//last
	NOT_FOUND = 'not_found',
}

export const RouterPath: Record<AppRouters, string> = {
	[AppRouters.MAIN]: '/',
	[AppRouters.ABOUT]: '/about',
	[AppRouters.PROFILE]: '/profile',
	[AppRouters.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRouters, AppRouteProps> = {
	[AppRouters.MAIN]: {
		path: RouterPath.main,
		element: <MainPage />,
	},
	[AppRouters.ABOUT]: {
		path: RouterPath.about,
		element: <AboutPage />,
	},
	[AppRouters.PROFILE]: {
		path: RouterPath.profile,
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRouters.NOT_FOUND]: {
		path: RouterPath.not_found,
		element: <NotFoundPage />,
	},
};
