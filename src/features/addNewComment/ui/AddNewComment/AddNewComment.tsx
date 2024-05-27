import cls from './AddNewComment.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import Input from 'shared/ui/Input/Input';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
	getAddNewCommentError,
	getAddNewCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import {
	addNewCommentActions,
	addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	DynamicModuleLoader,
	ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from 'shared/ui/Stack';

export interface AddNewCommentProps {
	className?: string;
	onSendComment: (text: string) => void;
}

const initialReducers: ReducersList = {
	addNewComment: addNewCommentReducer,
};

const AddNewComment = memo(
	({ className, onSendComment }: AddNewCommentProps) => {
		const { t } = useTranslation();
		const text = useSelector(getAddNewCommentText);
		const error = useSelector(getAddNewCommentError);
		const dispatch = useAppDispatch();

		const onCommentTextChange = useCallback(
			(value: string) => {
				dispatch(addNewCommentActions.setText(value));
			},
			[dispatch],
		);

		const onSendHandler = useCallback(() => {
			onSendComment(text || '');
			onCommentTextChange('');
		}, [onCommentTextChange, onSendComment, text]);

		return (
			<DynamicModuleLoader reducers={initialReducers}>
				<HStack
					justify="between"
					max
					className={classNames(cls.AddNewComment, {}, [className])}
				>
					<Input
						className={cls.input}
						placeholder={t('Введите текст комментария')}
						value={text}
						onChange={onCommentTextChange}
					/>
					<Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
						{t('Отправить')}
					</Button>
				</HStack>
			</DynamicModuleLoader>
		);
	},
);

export default AddNewComment;
