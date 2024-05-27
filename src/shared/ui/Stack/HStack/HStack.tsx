import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'direction'>;

export const HStack = (props: VStackProps) => {
	return <Flex direction="row" {...props} />;
};
