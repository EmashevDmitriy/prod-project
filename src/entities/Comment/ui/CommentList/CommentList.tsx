import cls from './CommentList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList = memo(
	({ className, comments, isLoading }: CommentListProps) => {
		const { t } = useTranslation();

		if (isLoading) {
			return (
				<div className={classNames('', {}, [className])}>
					<CommentCard isLoading />
					<CommentCard isLoading />
					<CommentCard isLoading />
				</div>
			);
		}

		return (
			<div className={classNames('', {}, [className])}>
				{comments?.length ? (
					comments.map(comment => (
						<CommentCard
							key={comment.id}
							isLoading={isLoading}
							className={cls.comment}
							comment={comment}
						/>
					))
				) : (
					<Text description={t('Комментарии отсутствуют')} />
				)}
			</div>
		);
	},
);
