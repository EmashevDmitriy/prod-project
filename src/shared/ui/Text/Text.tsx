import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

interface TextProps {
	className?: string;
	title?: string;
	description?: string;
	theme?: TextTheme;
	align?: TextAlign;
}

export const Text = memo(
	({
		className,
		title,
		description,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
	}: TextProps) => {
		return (
			<div
				className={classNames(cls.Text, {}, [
					className,
					cls[theme],
					cls[align],
				])}
			>
				{title && <p className={cls.title}>{title}</p>}
				{description && <p className={cls.description}>{description}</p>}
			</div>
		);
	},
);
