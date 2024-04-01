import type { Meta, StoryObj } from '@storybook/react';
import { Code } from './Code';

const meta: Meta<typeof Code> = {
	title: 'shared/Code',
	component: Code,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Normal: Story = {
	args: {
		text: `<div>
	<span>Hello, World!</span>
	<p>Something in the way</p>
</div>`,
	},
};
