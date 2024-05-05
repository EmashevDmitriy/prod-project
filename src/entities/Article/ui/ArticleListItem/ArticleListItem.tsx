import cls from './ArticleListItem.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import {
	Article,
	ArticleBlockType,
	ArticleTextBlock,
	ArticleView,
} from '../../model/types/article';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RouterPath } from 'shared/config/configRouter/routeConfig';

interface ArticleListItemProps {
	className?: string;
	article: Article;
	view: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(
	({ className, article, view, target }: ArticleListItemProps) => {
		const { t } = useTranslation();

		const types = (
			<Text description={article.type.join(', ')} className={cls.types} />
		);

		const views = (
			<>
				<Text description={String(article.views)} className={cls.views} />
				<Icon Svg={EyeIcon} />
			</>
		);

		if (view === ArticleView.PLATE) {
			const textBlock = article.blocks.find(
				block => block.type === ArticleBlockType.TEXT,
			) as ArticleTextBlock;

			return (
				<div
					className={classNames(cls.ArticleListItem, {}, [
						className,
						cls[view],
					])}
				>
					<Card>
						<div className={cls.header}>
							<Avatar size={30} src={article.user.avatar} />
							<Text
								description={article.user.username}
								className={cls.username}
							/>
							<Text description={article.createdAt} className={cls.date} />
						</div>
						<Text title={article.title} className={cls.title} />
						{types}
						<img src={article.img} alt={article.title} className={cls.img} />
						{textBlock && (
							<ArticleTextBlockComponent
								block={textBlock}
								className={cls.textBlock}
							/>
						)}
						<div className={cls.footer}>
							<AppLink
								target={target}
								to={RouterPath.article_details + article.id}
							>
								<Button theme={ButtonTheme.OUTLINE}>
									{t('Читать далее...')}
								</Button>
							</AppLink>
							{views}
						</div>
					</Card>
				</div>
			);
		}

		return (
			<AppLink
				target={target}
				to={RouterPath.article_details + article.id}
				className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
			>
				<Card>
					<div className={cls.imageWrapper}>
						<img src={article.img} alt={article.title} className={cls.img} />
						<Text description={article.createdAt} className={cls.date} />
					</div>
					<div className={cls.infoWrapper}>
						{types}
						{views}
					</div>
					<Text description={article.title} className={cls.title} />
				</Card>
			</AppLink>
		);
	},
);
