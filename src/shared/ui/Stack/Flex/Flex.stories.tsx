import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta: Meta<typeof Flex> = {
	title: 'shared/Stack/Flex',
	component: Flex,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Flex>;

const renderChildren = (
	<>
		<div>{'First'}</div>
		<div>{'Second'}</div>
		<div>{'Third'}</div>
	</>
);

export const Row: Story = {
	args: {
		children: renderChildren,
	},
};

export const RowGap4: Story = {
	args: {
		gap: '4',
		children: renderChildren,
	},
};

export const RowGap8: Story = {
	args: {
		gap: '8',
		children: renderChildren,
	},
};

export const RowGap16: Story = {
	args: {
		gap: '16',
		children: renderChildren,
	},
};

export const Column: Story = {
	args: {
		direction: 'column',
		children: renderChildren,
	},
};

export const ColumnGap4: Story = {
	args: {
		gap: '4',
		direction: 'column',
		children: renderChildren,
	},
};

export const ColumnGap8: Story = {
	args: {
		gap: '8',
		direction: 'column',
		children: renderChildren,
	},
};

export const ColumnGap16: Story = {
	args: {
		gap: '16',
		direction: 'column',
		children: renderChildren,
	},
};
