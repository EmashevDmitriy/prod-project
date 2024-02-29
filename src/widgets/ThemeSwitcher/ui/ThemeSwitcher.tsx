import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import DarkTheme from 'shared/assets/icons/theme-dark.svg';
import LightTheme from 'shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const { changeTheme, theme } = useTheme();
	return (
		<Button
			theme={ButtonTheme.CLEAR}
			className={classNames('', {}, [className])}
			onClick={changeTheme}
		>
			{theme === Theme.DARK ? <DarkTheme /> : <LightTheme />}
		</Button>
	);
};
