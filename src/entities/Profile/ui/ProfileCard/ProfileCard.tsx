import cls from './ProfileCard.module.scss';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import Input from 'shared/ui/Input/Input';
import { Profile } from '../../model/types/profile';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	error?: string;
	readonly?: boolean;
	isLoading?: boolean;
	onChangeFirstName?: (value?: string) => void;
	onChangeLastName?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCurrency?: (currency: Currency) => void;
	onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
	className,
	data,
	error,
	readonly,
	isLoading,
	onChangeFirstName,
	onChangeLastName,
	onChangeAge,
	onChangeCity,
	onChangeUsername,
	onChangeAvatar,
	onChangeCurrency,
	onChangeCountry,
}: ProfileCardProps) => {
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<div
				className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
			>
				<Loader />
			</div>
		);
	}

	if (error) {
		return (
			<div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					theme={TextTheme.ERROR}
					title={t('Произошла ошибка при загрузке профиля')}
					description={t('Попробуйте обновить страницу')}
					align={TextAlign.CENTER}
				/>
			</div>
		);
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<div className={classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar && (
				<div className={cls.avatarWrapper}>
					<Avatar src={data?.avatar} size={150} />
				</div>
			)}
			<div className={cls.data}>
				<Input
					value={data?.firstName}
					placeholder={t('Имя')}
					className={cls.input}
					onChange={onChangeFirstName}
					readonly={readonly}
				/>
				<Input
					value={data?.lastName}
					placeholder={t('Фамилия')}
					className={cls.input}
					onChange={onChangeLastName}
					readonly={readonly}
				/>
				<Input
					value={data?.age}
					placeholder={t('Возраст')}
					className={cls.input}
					onChange={onChangeAge}
					readonly={readonly}
				/>
				<Input
					value={data?.city}
					placeholder={t('Город')}
					className={cls.input}
					onChange={onChangeCity}
					readonly={readonly}
				/>
				<Input
					value={data?.username}
					placeholder={t('Имя пользователя')}
					className={cls.input}
					onChange={onChangeUsername}
					readonly={readonly}
				/>
				<Input
					value={data?.avatar}
					placeholder={t('Ссылка на аватар')}
					className={cls.input}
					onChange={onChangeAvatar}
					readonly={readonly}
				/>
				<CurrencySelect
					className={cls.input}
					onChange={onChangeCurrency}
					value={data?.currency}
					readonly={readonly}
				/>
				<CountrySelect
					className={cls.input}
					onChange={onChangeCountry}
					value={data?.country}
					readonly={readonly}
				/>
			</div>
		</div>
	);
};
