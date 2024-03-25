import React, {
	InputHTMLAttributes,
	memo,
	useEffect,
	useRef,
	useState,
} from 'react';
import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
}

const Input = (props: InputProps) => {
	const {
		className,
		value,
		onChange,
		type = 'text',
		placeholder,
		autofocus,
		readonly,
		...otherProps
	} = props;
	const ref = useRef<HTMLInputElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);

	useEffect(() => {
		if (autofocus) {
			setIsFocused(true);
			ref.current?.focus();
		}
	}, [autofocus]);

	const onFocus = () => {
		setIsFocused(true);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onSelect = (event: any) => {
		setCaretPosition(event?.target?.selectionStart || 0);
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(event.target.value);
		setCaretPosition(event.target.value.length);
	};

	const isCaretVisible = isFocused && !readonly;

	return (
		<div
			className={classNames(cls.InputWrapper, { [cls.readonly]: readonly }, [
				className,
			])}
		>
			{placeholder && (
				<div className={cls.placeholder}>{placeholder + '>'}</div>
			)}
			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					className={cls.input}
					type={type}
					value={value}
					onChange={onChangeHandler}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{isCaretVisible && (
					<span
						className={cls.caret}
						style={{ left: `${caretPosition * 9}px` }}
					/>
				)}
			</div>
		</div>
	);
};

export default memo(Input);
