import { memo } from 'react';
import cls from './LangSwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
	className?: string;
	short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
	const { t, i18n } = useTranslation();

	const toggle = async () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			onClick={toggle}
			theme={ButtonTheme.CLEAR}
			className={classNames(cls.LangSwitcher, {}, [className])}
		>
			{t(short ? 'Сокращенный язык' : 'Язык')}
		</Button>
	);
});
