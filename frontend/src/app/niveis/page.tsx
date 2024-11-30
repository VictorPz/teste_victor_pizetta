'use client';

import { useState } from 'react';
import { Box, Table, Input, Text} from '@chakra-ui/react';
import CustomModal from '@/components/CustomModal';
import { useDisclosure } from '@chakra-ui/hooks'
import GenericButton from '@/components/GenericButton';
// import { ArrowUpIcon, ArrowDownIcon, Icon } from '@chakra-ui/icons';

type Level = {
    id: number;
    name: string;
    developersCount: number;
};

const mockLevels: Level[] = [
    { id: 1, name: 'Junior', developersCount: 5 },
    { id: 2, name: 'Pleno', developersCount: 3 },
    { id: 3, name: 'Sênior', developersCount: 2 },
];

const LevelPage = () => {
    const [levels, setLevels] = useState<Level[]>(mockLevels);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null); // Estado para armazenar a direção da ordenação
    const [sortColumn, setSortColumn] = useState<string | null>(null); // Estado para a coluna ordenada
    const [editingLevel, setEditingLevel] = useState<Level | null>(null); // Estado para edição
    const [newName, setNewName] = useState<string>(''); // Estado para o novo nome do nível
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredLevels = levels.filter(level =>
        level.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSort = (column: 'name' | 'developersCount') => {
        let sortedData = [...levels];
        let newSortOrder: 'asc' | 'desc' = 'asc';

        if (sortColumn === column && sortOrder === 'asc') {
            newSortOrder = 'desc';
        }

        sortedData.sort((a, b) => {
            if (column === 'name') {
                return newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (column === 'developersCount') {
                return newSortOrder === 'asc' ? a.developersCount - b.developersCount : b.developersCount - a.developersCount;
            }
            return 0;
        });

        setSortOrder(newSortOrder);
        setSortColumn(column);
        setLevels(sortedData);
    };

    const handleDelete = (id: number) => {
        setLevels(levels.filter(level => level.id !== id));
    };

    const handleEdit = (level: Level) => {
        setEditingLevel(level);
        setNewName(level.name);
        onOpen();
    };

    const handleSave = () => {
        if (editingLevel) {
            setLevels(levels.map(level => (level.id === editingLevel.id ? { ...level, name: newName } : level)));
            setEditingLevel(null);
            setNewName('');
            onClose();
        }
    };

    return (
        <Box
            h='100%'
            p='25px'
            display='block'
        >
            <Box
                display='flex'
                justifyContent='space-between'
                gap='20'
            >
                <Input
                    placeholder="Buscar nível..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado com o valor da busca
                    w='80%'
                    cursor='text'
                    backgroundColor='whiteAlpha.500'
                    color='black'
                    _placeholder={{color: 'black'}}
                />
                <GenericButton size='lg' variant='subtle' title="Adicionar Nível" color="blue" onClick={() => 'lul'} />
            </Box>
            <Table.Root
                w='80%'
                stickyHeader
                interactive>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader
                            onClick={() => handleSort('name')}
                            cursor="pointer"
                        >
                            Niveis
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            onClick={() => handleSort('developersCount')}
                            cursor="pointer"
                        >
                            Qt Desenvolvedores
                        </Table.ColumnHeader>
                        <Table.ColumnHeader>Ações</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredLevels.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.developersCount}</Table.Cell>
                            <Table.Cell>
                                <GenericButton size='sm' variant='ghost' title="Editar" color="blue" onClick={() => handleEdit(item)} />
                                <GenericButton size='sm' variant='ghost' title="Excluir" color="red" onClick={() => handleDelete(item.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* Modal */}
            <CustomModal
                title="Editar Nível"
                isOpen={isOpen}
                onClose={onClose}
                onSave={handleSave}
                body={
                    editingLevel ? (
                        <>
                            <Text mb='4px'>Nível:</Text>
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Novo nome do nível"
                            />
                        </>
                    ) : (
                        <Text>Selecione um nível para editar.</Text>
                    )
                }
            />
        </Box>
    );
};

export default LevelPage;

