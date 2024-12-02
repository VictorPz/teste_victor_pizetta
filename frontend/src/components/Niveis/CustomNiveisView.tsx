import { useState, useEffect } from 'react';
import { Box, Table, Input, Text} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { LuArrowUpDown } from 'react-icons/lu';
import { Toaster, toaster } from "@/components/ui/toaster"
import CustomModal from '@/components/CustomModal';
import GenericButton from '@/components/GenericButton';
import api from '@/api/axiosConfig'; // Importe o Axios

export type Level = {
    id: number;
    nivel: string; // Nome do nível
    developersCount: number; // Contagem de desenvolvedores
};

const LevelPage = () => {
    const [levels, setLevels] = useState<Level[]>([]);

    //Adicionar Novo Nível
    const [newLevelName, setNewLevelName] = useState<string>('');
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();

    //Ordenar Tabela
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc'); // Direção da ordenação
    const [sortedColumn, setSortedColumn] = useState<'nivel' | 'developersCount'>('nivel'); // Coluna ordenada

    //Busca
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchLevels = async () => {
        try {
            // Primeira requisição: buscar os níveis
            const levelsResponse = await api.get('/niveis', {
                params: {
                    nivel: searchQuery,
                }
            });

            // Segunda requisição: buscar a contagem de desenvolvedores
            const developersCountResponse = await api.get('/dev-count'); // Usando a rota correta para contagem de desenvolvedores

            // Combina os dados de níveis com a contagem de desenvolvedores
            const levelsWithCount = levelsResponse.data.data.map((level: any) => {
                const count = developersCountResponse.data.data.find((item: any) => item.id === level.id);
                return {
                    ...level,
                    developersCount: count ? count.desenvolvedores_count : 0,  // Adiciona a contagem de desenvolvedores
                };
            });

            // Atualiza o estado com os níveis combinados
            setLevels(levelsWithCount);

        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido";
            toaster.create({
                title: "Falha ao buscar:",
                description: errorMessage,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            // Caso a barra de busca esteja vazia, retorna todos os níveis
            fetchLevels();
        } else {
            // Filtra localmente os níveis com base na busca
            const filtered = levels.filter(level =>
                level.nivel.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setLevels(filtered);
        }
    }, [searchQuery]);

    //OrdenaÇão da Tabela
    const handleSort = (column: 'nivel' | 'developersCount') => {
        const newSortDirection = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'; // Inverte a direção
        setSortDirection(newSortDirection); // Atualiza a direção da ordenação
        setSortedColumn(column); // Define qual coluna está sendo ordenada

        // Ordena os dados com base na coluna e direção
        const sortedData = [...levels].sort((a, b) => {
            if (column === 'nivel') {
                return newSortDirection === 'asc' ? a.nivel.localeCompare(b.nivel) : b.nivel.localeCompare(a.nivel);
            } else if (column === 'developersCount') {
                return newSortDirection === 'asc' ? a.developersCount - b.developersCount : b.developersCount - a.developersCount;
            }
            return 0;
        });
        setLevels(sortedData);
    };

    // Adicionar um novo nível
    const handleAddLevel = async () => {
        try {
            const response = await api.post('/niveis', {
                nivel: newLevelName,
            });
            setLevels((prevLevels) => [...prevLevels, response.data]); // Adiciona o novo nível
            toaster.create({
                title: 'Nível adicionado com sucesso!',
                type: 'success',
            })
            setNewLevelName('');
            onAddClose();
        } catch (error: any) {
            console.log('cai no catch de erro ao dd level')
            const errorMessage = error.response?.data.message || "Erro desconhecido";
            toaster.create({
                title: "Falha ao adicionar nivel:",
                description: errorMessage,
                type: "error",
            });
        }
    };

    //Editar
    const [updatedLevel, setUpdatedLevel] = useState<Level | null>(null);
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onModalEditClose } = useDisclosure();

    const openEditModal = (level: Level) => {
        setUpdatedLevel(level); // Preenche o formulário com os dados atuais
        onModalEditOpen();
    };

    const handleEditLevel = async () => {
        if (!updatedLevel) return;
        try {
            const payload = {
                nivel: updatedLevel.nivel,
            };

            // Atualiza os dados do desenvolvedor na API
            await api.put(`/niveis/${updatedLevel?.id}`, payload);

            setLevels(prev => prev.map(nivel => nivel.id === updatedLevel?.id ? { ...nivel, ...updatedLevel } : nivel));
            toaster.create({
                title: 'O nivel foi atualizado com sucesso',
                type: 'success',
            });

            fetchLevels();
            onModalEditClose();

        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido."
            toaster.create({
                title: 'Erro ao editar:',
                description: errorMessage,
                type: 'error',
            })
        }
    };

    //Excluir
    const { isOpen: isModalExcOpen, onOpen: onModalExcOpen, onClose: onModalExcClose } = useDisclosure();
    const [levelToDelete, setLevelToDelete] = useState<Level | null>(null);

    const openDeleteModal = (level: Level) => {
        setLevelToDelete(level);
        onModalExcOpen();
    };

    const handleDelete = async () => {
        try {
            if(!levelToDelete) return;
            await api.delete(`/niveis/${levelToDelete.id}`);
            setLevels(levels.filter(level => level.id !== levelToDelete.id)); // Remove o nível
            toaster.create({
                title: 'O nivel foi removido com sucesso',
                type: 'success',
            })
            onModalExcClose()
        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido."
            toaster.create({
                title: 'O nivel não pode ser removido',
                description: errorMessage,
                type: 'error',
            })
            onModalExcClose()
        }
    };

    //Busca
    const filteredLevels = levels.filter(level =>
        level.nivel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p="25px" gap="4">
            <Box display="flex" justifyContent="space-between" gap="20" w="95%">
                <Input
                    placeholder="Buscar nível..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    w="80%"
                    cursor="text"
                    backgroundColor="whiteAlpha.500"
                    color="black"
                    _placeholder={{ color: 'black' }}
                />
                <GenericButton size="lg" variant="subtle" title="Adicionar Nível" color="blue" onClick={onAddOpen} />
            </Box>
            <Box w="95%">
                <Table.Root stickyHeader>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader onClick={() => handleSort('nivel')} cursor="pointer">
                                <Box display="flex" alignItems="center" gap="3">
                                    Níveis
                                    <LuArrowUpDown />
                                </Box>
                            </Table.ColumnHeader>
                            <Table.ColumnHeader onClick={() => handleSort('developersCount')} cursor="pointer">
                                <Box display="flex" alignItems="center" gap="3">
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
                                <Table.Cell>{item.nivel}</Table.Cell>
                                <Table.Cell>{item.developersCount}</Table.Cell>
                                <Table.Cell>
                                    <GenericButton size="sm" variant="subtle" title="Editar" color="blue" onClick={() => {openEditModal(item)}} />
                                    <GenericButton size="sm" variant="ghost" title="Excluir" color="red" onClick={() => openDeleteModal(item)} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Box>

            {/* Modal Adicionar Novo Nível */}
            <CustomModal
                title="Adicionar Novo Nivel"
                mainButtonTitle="Salvar"
                body={
                    <Box display="flex" flexDirection="column" gap="4">
                        <Input
                            placeholder="Nome do Nível:"
                            value={newLevelName}
                            onChange={(e) => setNewLevelName(e.target.value)}
                        />
                    </Box>
                }
                isOpen={isAddOpen}
                onClose={onAddClose} // Fecha o modal
                onSave={handleAddLevel} // Salva o novo desenvolvedor
            />

            {/* Modal de Edição */}
            <CustomModal
                title="Editar Desenvolvedor"
                mainButtonTitle='Salvar'
                isOpen={isModalEditOpen}
                onClose={onModalEditClose}
                onSave={handleEditLevel}
                body={
                    <>
                        <Text>Novo Nivel:</Text>
                        <Input
                            value={updatedLevel?.nivel || ''}
                            onChange={(e) => setUpdatedLevel(prev => prev ? { ...prev, nivel: e.target.value } : prev)}
                        />
                    </>
                }
            />

            {/* Modal Excluir nivel */}
            <CustomModal
                title="Atenção!"
                mainButtonTitle='Sim'
                isOpen={isModalExcOpen}
                onClose={onModalExcClose}
                onSave={handleDelete}
                body={
                    <Text>Tem certeza que deseja remover PERMANENTEMENTE o nivel selecionado?</Text>
                }
            />

            <Toaster/>
        </Box>
    );
};
export default LevelPage;