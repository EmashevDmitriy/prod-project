import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
	getProfileData,
	getProfileReadonly,
	profileAction,
	updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { getUserAuthData } from 'entities/User';
import { HStack } from 'shared/ui/Stack';

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
	const { t } = useTranslation('profile');

	const readonly = useSelector(getProfileReadonly);
	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	const canEdit = authData?.id === profileData?.id;
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
		<HStack max justify="between" className={classNames('', {}, [className])}>
			<Text title={t('Профиль')} />
			{canEdit && (
				<>
					{readonly ? (
						<Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
							{t('Редактировать')}
						</Button>
					) : (
						<HStack gap="8">
							<Button theme={ButtonTheme.OUTLINE} onClick={onSaveEdit}>
								{t('Сохранить')}
							</Button>
							<Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEdit}>
								{t('Отменить')}
							</Button>
						</HStack>
					)}
				</>
			)}
		</HStack>
	);
};
