import { RouterPath } from 'shared/config/configRouter/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import MainIcon from 'shared/assets/icons/main.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';

export interface SidebarItemType {
	path: string;
	text: string;
	Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
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
	{
		path: RouterPath.profile,
		text: 'Профиль',
		Icon: ProfileIcon,
		authOnly: true,
	},
];
