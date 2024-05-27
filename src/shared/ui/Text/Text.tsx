import { memo } from 'react';
import cls from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum TextTheme {
	PRIMARY = 'primary',
	INVERTED = 'inverted',
	ERROR = 'error',
}

export enum TextAlign {
	RIGHT = 'right',
	LEFT = 'left',
	CENTER = 'center',
}

export enum TextSize {
	S = 'size_s',
	M = 'size_m',
	L = 'size_l',
}

interface TextProps {
	className?: string;
	title?: string;
	description?: string;
	theme?: TextTheme;
	align?: TextAlign;
	size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
	[TextSize.S]: 'h3',
	[TextSize.M]: 'h2',
	[TextSize.L]: 'h1',
};

export const Text = memo(
	({
		className,
		title,
		description,
		theme = TextTheme.PRIMARY,
		align = TextAlign.LEFT,
		size = TextSize.M,
	}: TextProps) => {
		const HeaderTag = mapSizeToHeaderTag[size];
		const classes = [className, cls[theme], cls[align], cls[size]];
		return (
			<div className={classNames(cls.Text, {}, classes)}>
				{title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
				{description && <p className={cls.description}>{description}</p>}
			</div>
		);
	},
);
