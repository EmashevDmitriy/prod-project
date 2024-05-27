import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { RouterPath } from 'shared/config/configRouter/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from '../../model/selectors/article';
import { getArticleData } from 'entities/Article';
import { HStack } from 'shared/ui/Stack';

interface ArticleDetailsPageHeaderProps {
	className?: string;
}

export const ArticleDetailsPageHeader = memo(
	({ className }: ArticleDetailsPageHeaderProps) => {
		const { t } = useTranslation();
		const navigate = useNavigate();
		const canEdit = useSelector(getCanEditArticle);
		const article = useSelector(getArticleData);

		const onBackToList = useCallback(() => {
			navigate(RouterPath.articles);
		}, [navigate]);

		const onEditArticle = useCallback(() => {
			navigate(`${RouterPath.article_details}${article?.id}/edit`);
		}, [article?.id, navigate]);

		return (
			<HStack max justify="between" className={classNames('', {}, [className])}>
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
					{t('Назад к списку')}
				</Button>
				{canEdit && (
					<Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
						{t('Редактировать')}
					</Button>
				)}
			</HStack>
		);
	},
);
