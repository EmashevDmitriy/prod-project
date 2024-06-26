import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RouterPath } from 'shared/config/configRouter/routeConfig';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Text
					className={cls.appName}
					title={t('Public App')}
					theme={TextTheme.INVERTED}
				/>
				<AppLink
					className={cls.createBtn}
					to={RouterPath.article_create}
					theme={AppLinkTheme.SECONDARY}
				>
					{t('Создать статью')}
				</AppLink>
				<Button
					theme={ButtonTheme.CLEAR_INVERTED}
					onClick={onLogout}
					className={cls.links}
				>
					{t('Выйти')}
				</Button>
			</header>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR_INVERTED}
				onClick={onShowModal}
				className={cls.links}
			>
				{t('Войти')}
			</Button>
			{isAuthModal && (
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			)}
		</header>
	);
});
