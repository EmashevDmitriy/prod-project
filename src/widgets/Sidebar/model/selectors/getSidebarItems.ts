import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../types/sidebar';
import { RouterPath } from 'shared/config/configRouter/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';

export const getSidebarItems = createSelector(getUserAuthData, userData => {
	const sidebarItemsList: SidebarItemType[] = [
		{
			path: RouterPath.main,
			text: 'Главная',
			Icon: MainIcon,
		},
		{
			path: RouterPath.about,
			text: 'О компании',
			Icon: AboutIcon,
		},
	];
	if (userData) {
		sidebarItemsList.push(
			{
				path: RouterPath.profile + userData?.id,
				text: 'Профиль',
				Icon: ProfileIcon,
				authOnly: true,
			},
			{
				path: RouterPath.articles,
				text: 'Статьи',
				Icon: ArticlesIcon,
				authOnly: true,
			},
		);
	}
	return sidebarItemsList;
});
