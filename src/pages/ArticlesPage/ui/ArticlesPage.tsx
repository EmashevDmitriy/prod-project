import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticlesPageProps {
	className?: string;
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	return (
		<div className={classNames('', {}, [className])}>
			<h1>{'Articles Page'}</h1>
		</div>
	);
};

export default memo(ArticlesPage);
