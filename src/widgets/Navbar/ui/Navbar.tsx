import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onToggleModal = useCallback(() => {
		setIsAuthModal(prev => !prev);
	}, []);

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<div className={cls.links}>
				<Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onToggleModal}>
					{t('Войти')}
				</Button>
				<Modal isOpen={isAuthModal} onClose={onToggleModal}>
					<p>{'Lorem ipsum and something for testing content modal'}</p>
				</Modal>
			</div>
		</div>
	);
};
