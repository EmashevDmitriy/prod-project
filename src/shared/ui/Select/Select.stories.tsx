import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
	title: 'shared/Select',
	component: Select,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
	args: {
		label: 'Some text',
		options: [
			{ value: '1', content: 'Пункт первый' },
			{ value: '2', content: 'Пункт второй' },
			{ value: '3', content: 'Пункт третий' },
		],
	},
};
