import cls from './Icon.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';

interface IconProps {
	className?: string;
	Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo(({ className, Svg }: IconProps) => {
	return <Svg className={classNames(cls.Icon, {}, [className])} />;
});
