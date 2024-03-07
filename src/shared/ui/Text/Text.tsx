import cls from './Text.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum TextTheme {
	PRIMARY = 'primary',
	ERROR = 'error',
}

interface TextProps {
	className?: string;
	title?: string;
	description?: string;
	theme?: TextTheme;
}

export const Text = ({
	className,
	title,
	description,
	theme = TextTheme.PRIMARY,
}: TextProps) => {
	return (
		<div className={classNames(cls.Text, {}, [className, cls[theme]])}>
			{title && <p className={cls.title}>{title}</p>}
			{description && <p className={cls.description}>{description}</p>}
		</div>
	);
};
