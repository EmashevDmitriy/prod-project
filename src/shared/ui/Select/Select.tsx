import { ChangeEvent, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export interface SelectOptions<T extends string> {
	value: T;
	content: string;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOptions<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean;
}

export const Select = <T extends string>({
	className,
	label,
	options,
	value,
	onChange,
	readonly,
}: SelectProps<T>) => {
	const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value as T);
		}
	};

	const optionsList = useMemo(() => {
		return options?.map(opt => (
			<option className={cls.option} value={opt.value} key={opt.value}>
				{opt.content}
			</option>
		));
	}, [options]);

	return (
		<div className={classNames(cls.Wrapper, {}, [className])}>
			{label && <span className={cls.label}>{label + '>'}</span>}
			<select
				disabled={readonly}
				className={cls.select}
				value={value}
				onChange={onChangeHandler}
			>
				{optionsList}
			</select>
		</div>
	);
};
