import { AboutPage } from 'pages/AboutPage';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';
import { ArticlesPage } from 'pages/ArticlesPage';
import { MainPage } from 'pages/MainPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { RouteProps } from 'react-router-dom';

export type AppRouteProps = RouteProps & {
	authOnly?: boolean;
};

export enum AppRouters {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = 'articles',
	ARTICLE_DETAILS = 'article_details',
	ARTICLE_CREATE = 'article_create',
	ARTICLE_EDIT = 'article_edit',
	//last
	NOT_FOUND = 'not_found',
}

export const RouterPath: Record<AppRouters, string> = {
	[AppRouters.MAIN]: '/',
	[AppRouters.ABOUT]: '/about',
	[AppRouters.PROFILE]: '/profile/',
	[AppRouters.ARTICLES]: '/articles',
	[AppRouters.ARTICLE_DETAILS]: '/articles/',
	[AppRouters.ARTICLE_CREATE]: '/articles/new',
	[AppRouters.ARTICLE_EDIT]: '/articles/:id/edit',
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
		path: `${RouterPath.profile}:id`,
		element: <ProfilePage />,
		authOnly: true,
	},
	[AppRouters.ARTICLES]: {
		path: RouterPath.articles,
		element: <ArticlesPage />,
		authOnly: true,
	},
	[AppRouters.ARTICLE_DETAILS]: {
		path: `${RouterPath.article_details}:id`,
		element: <ArticleDetailsPage />,
		authOnly: true,
	},
	[AppRouters.ARTICLE_CREATE]: {
		path: `${RouterPath.article_create}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRouters.ARTICLE_EDIT]: {
		path: `${RouterPath.article_edit}`,
		element: <ArticleEditPage />,
		authOnly: true,
	},
	[AppRouters.NOT_FOUND]: {
		path: RouterPath.not_found,
		element: <NotFoundPage />,
	},
};
