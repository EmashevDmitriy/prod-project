import cls from './ArticleEditPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ArticleEditPageProps {
	className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();
	const isEdit = Boolean(id);

	return (
		<Page className={classNames(cls.ArticleEditPage, {}, [className])}>
			{isEdit ? t('Редактирование статьи №') + id : t('Создание новой статьи')}
		</Page>
	);
});

export default ArticleEditPage;
