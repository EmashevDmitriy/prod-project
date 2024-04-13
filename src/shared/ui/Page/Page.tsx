import cls from './Page.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { MutableRefObject, ReactNode, memo, useRef } from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';

interface PageProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		callback: onScrollEnd,
	});

	return (
		<section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
			{children}
			<div ref={triggerRef} />
		</section>
	);
});
