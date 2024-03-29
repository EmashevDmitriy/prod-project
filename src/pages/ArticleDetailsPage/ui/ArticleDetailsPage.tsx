import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleDetailsPageProps {
	className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	return (
		<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
			<h1>{'Article Detail Page'}</h1>
		</div>
	);
};

export default memo(ArticleDetailsPage);
