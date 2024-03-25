import { Text } from 'shared/ui/Text/Text';
import cls from './ProfilePageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
	getProfileReadonly,
	profileAction,
	updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
	const { t } = useTranslation('profile');

	const readonly = useSelector(getProfileReadonly);
	const dispatch = useAppDispatch();

	const onEdit = useCallback(() => {
		dispatch(profileAction.setReadonly(false));
	}, [dispatch]);

	const onCancelEdit = useCallback(() => {
		dispatch(profileAction.cancelEdit());
	}, [dispatch]);

	const onSaveEdit = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	return (
		<div className={classNames(cls.ProfilePageHeader, {}, [className])}>
			<Text title={t('Профиль')} />
			{readonly ? (
				<Button
					className={cls.editBtn}
					theme={ButtonTheme.OUTLINE}
					onClick={onEdit}
				>
					{t('Редактировать')}
				</Button>
			) : (
				<div>
					<Button
						className={cls.editBtn}
						theme={ButtonTheme.OUTLINE}
						onClick={onSaveEdit}
					>
						{t('Сохранить')}
					</Button>
					<Button
						className={cls.editBtn}
						theme={ButtonTheme.OUTLINE_RED}
						onClick={onCancelEdit}
					>
						{t('Отменить')}
					</Button>
				</div>
			)}
		</div>
	);
};
