import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ButtonTheme {
	CLEAR = 'clear',
	CLEAR_INVERTED = 'clearInverted',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
}

export const Button: FC<ButtonProps> = props => {
	const { className, children, theme, square, size, ...otherProps } = props;
	const additional: string[] = [className, cls[theme], cls[size]];

	return (
		<button
			type="button"
			className={classNames(cls.Button, { [cls.square]: square }, additional)}
			{...otherProps}
		>
			{children}
		</button>
	);
};
