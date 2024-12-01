'use client';

import { useState } from 'react';
import { Box, Table, Input, Text} from '@chakra-ui/react';
import CustomModal from '@/components/CustomModal';
import { useDisclosure } from '@chakra-ui/hooks'
import GenericButton from '@/components/GenericButton';
import { LuArrowUpDown } from 'react-icons/lu';
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

    //Ordenamento Colunas
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null); // Estado para armazenar a direção da ordenação
    const [sortColumn, setSortColumn] = useState<string | null>(null); // Estado para a coluna ordenada

    //Modal Edição
    const [editingLevel, setEditingLevel] = useState<Level | null>(null); // Estado para edição
    const [newName, setNewName] = useState<string>(''); // Estado para o novo nome do nível
    const { isOpen, onOpen, onClose } = useDisclosure();

    //Modal Adicionar Nivel
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const [newLevelName, setNewLevelName] = useState<string>('');
    const [newDevelopersCount, setNewDevelopersCount] = useState<number>(0);

    //Modal confirmar exclusão
    const { isOpen: isModalExcOpen, onOpen: onModalExcOpen, onClose: onModalExcClose } = useDisclosure();

    const confirmDelete = () => {
        alert('Deletado!')
        onModalExcClose();
    };

    //Barra Busca
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
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            p='25px'
            gap='4'
        >
            <Box
                display='flex'
                justifyContent='space-between'
                gap='20'
                w='95%'
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
                <GenericButton size='lg' variant='subtle' title="Adicionar Nível" color="blue" onClick={onAddOpen} />
            </Box>
            <Table.Root
                w='95%'
                stickyHeader
                interactive>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader
                            onClick={() => handleSort('name')}
                            cursor="pointer"
                        >
                            <Box display='flex' alignItems='center' gap='3'>
                                Niveis
                                <LuArrowUpDown />
                            </Box>
                        </Table.ColumnHeader>
                        <Table.ColumnHeader
                            onClick={() => handleSort('developersCount')}
                            cursor="pointer"
                        >
                            <Box display='flex' alignItems='center' gap='3'>
                                Desenvolvedores Associados
                                <LuArrowUpDown />
                            </Box>
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
                                <GenericButton size='sm' variant='subtle' title="Editar" color="blue" onClick={() => handleEdit(item)} />
                                <GenericButton size='sm' variant='ghost' title="Excluir" color="red" onClick={onModalExcOpen} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* Modal Confirmar exclusão */}
            <CustomModal
                title="Atenção!"
                mainButtonTitle='Sim'
                isOpen={isModalExcOpen}
                onClose={onModalExcClose}
                onSave={confirmDelete}
                body={
                    <Text>Tem certeza que deseja remover PERMANENTEMENTE o nivel selecionado?</Text>
                }
            />

            {/* Modal Editar Nivel */}
            <CustomModal
                title="Editar Nível"
                mainButtonTitle='Salvar'
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

            {/* Modal Adicionar Nivel*/}
            <CustomModal
                title="Cadastrar Novo Nível"
                mainButtonTitle='Salvar'
                isOpen={isAddOpen}
                onClose={() => {
                    setNewLevelName('');
                    onAddClose();
                }}
                onSave={() => {
                    if (newLevelName.trim()) {
                        const newLevel: Level = {
                            id: levels.length + 1, // Gera um ID único
                            name: newLevelName,
                            developersCount: newDevelopersCount,
                        };
                        setLevels([...levels, newLevel]);
                        setNewLevelName('');
                        setNewDevelopersCount(0);
                        onAddClose();
                    }
                }}
                body={
                    <>
                        <Text mb='4px'>Nome do Nível:</Text>
                        <Input
                            value={newLevelName}
                            onChange={(e) => setNewLevelName(e.target.value)}
                            placeholder="Digite o nome do nível"
                        />
                    </>
                }
            />
        </Box>
    );
};

export default LevelPage;

