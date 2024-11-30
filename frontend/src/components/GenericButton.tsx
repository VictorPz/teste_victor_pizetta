import { Button, ConditionalValue } from '@chakra-ui/react';

interface GenericButtonProps {
    title: string;
    color: string;
    variant?: ConditionalValue<"outline" | "solid" | "subtle" | "surface" | "ghost" | "plain" | undefined>;
    size?: ConditionalValue<'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined>
    onClick: () => void;
}

const GenericButton = ({ size, title, color, variant, onClick}: GenericButtonProps) => {
    return (
    <Button size={size} variant={variant} colorPalette={color} flex="1" onClick={onClick} gap='2' >
        {title}
    </Button>
    );
};

export default GenericButton;