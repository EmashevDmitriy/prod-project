import { CSSProperties, useMemo } from 'react';
import cls from './Avatar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

export const Avatar = ({ className, src, size, alt }: AvatarProps) => {
	const styles = useMemo<CSSProperties>(() => {
		return {
			width: size,
			height: size,
		};
	}, [size]);

	return (
		<img
			alt={alt}
			style={styles}
			src={src}
			className={classNames(cls.Avatar, {}, [className])}
		/>
	);
};
