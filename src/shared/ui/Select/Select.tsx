import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export interface SelectOptions {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	options?: SelectOptions[];
	value?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

export const Select = memo(
	({ className, label, options, value, onChange, readonly }: SelectProps) => {
		const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
			if (onChange) {
				onChange(event.target.value);
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
	},
);
