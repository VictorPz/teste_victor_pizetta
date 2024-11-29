'use client';

import { Box, Text, Stack } from '@chakra-ui/react';

const LevelPage = () => {
    // Simulação de uma lista de níveis para exibição
    const levels = ['Junior', 'Pleno', 'Sênior'];

    return (
        <Box p={4}>
            <Stack padding={4}>
                {levels.map((level, index) => (
                    <Box key={index} p={4} border="1px solid" borderRadius="md">
                        <Text>{level}</Text>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default LevelPage;