import api from "@/api/axiosConfig";
import { useState, useEffect } from "react";
import { Box, Button,Input, Stack, Text, HStack} from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"
import { useDisclosure } from '@chakra-ui/hooks'
import { Field } from "@/components/ui/field"
import dayjs from 'dayjs';
import DeveloperCard from '@/components/DeveloperCard';
import NewDeveloperAndSearchBar from "./NewDeveloperAndSearchBar";
import CustomModal from '@/components/CustomModal';
import GenericButton from "../GenericButton";

type Level = {
    id: number;
    nivel: string;
};

type Developer = {
    id: number;
    nome: string;
    sexo: string;
    data_nascimento: string;
    hobby: string;
    idade: number;
    nivel: Level;
};

type ApiResponse = {
    data: Developer[];
    meta: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
};

const CustomDevelopersView = () => {
    //Atualizar página principal
    const [currentPage, setCurrentPage] = useState(1); // Página atual
    const [meta, setMeta] = useState<ApiResponse['meta'] | null>(null); // Metadados da API
    const [developers, setDevelopers] = useState<Developer[]>([]);

    const fetchDevelopers = async (page: number = 1) => {
        try {
            const response = await api.get<ApiResponse>("/desenvolvedores", {params:{ page }});
            setDevelopers(response.data.data);
            setMeta(response.data.meta)
        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido ao adicionar desenvolvedor."
            toaster.create({
                title: 'Erro ao editar:',
                description: errorMessage,
                type: 'error',
            })
        }
    };

    // Atualiza a lista de desenvolvedores (usado pelo NewDeveloperAndSearchBar)
    const handleDevelopersUpdate = (updatedDevelopers: Developer[]) => {
        setDevelopers(updatedDevelopers);
    };

    //Editar Desenvolvedor
    const [updatedDeveloper, setUpdatedDeveloper] = useState<Developer | null>(null);
    const [developerToEdit, setDeveloperToEdit] = useState<Developer | null>(null);
    const { isOpen: isModalEditOpen, onOpen: onModalEditOpen, onClose: onModalEditClose } = useDisclosure();

    const handleEditDeveloper = async () => {
        if (!updatedDeveloper) return;

        try {
            const payload = {
                nome: updatedDeveloper.nome,
                sexo: updatedDeveloper.sexo,
                data_nascimento: updatedDeveloper.data_nascimento,
                hobby: updatedDeveloper.hobby,
                nivel_id: updatedDeveloper.nivel.id,
            };
            // Atualiza os dados do desenvolvedor na API
            await api.put(`/desenvolvedores/${developerToEdit?.id}`, payload);

            setDevelopers(prev => prev.map(dev => dev.id === developerToEdit?.id ? { ...dev, ...updatedDeveloper } : dev));

            toaster.create({
                title: 'O desenvolvedor foi atualizado com sucesso',
                type: 'success',
            });

            onModalEditClose();
            fetchDevelopers();
        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido ao adicionar desenvolvedor."
            toaster.create({
                title: 'Erro ao editar:',
                description: errorMessage,
                type: 'error',
            })
        }
    };

    const openEditModal = (developer: Developer) => {
        setDeveloperToEdit(developer);
        setUpdatedDeveloper(developer); // Preenche o formulário com os dados atuais
        onModalEditOpen();
    };

    // Exclusão do desenvolvedor
    const [developerToDelete, setDeveloperToDelete] = useState<Developer | null>(null);
    const { isOpen: isModalExcOpen, onOpen: onModalExcOpen, onClose: onModalExcClose } = useDisclosure();

    const openDeleteModal = (developer: Developer) => {
        setDeveloperToDelete(developer);
        onModalExcOpen();
    };

    const handleDeleteDeveloper = async () => {
        try {
            if (!developerToDelete) return;
            await api.delete(`/desenvolvedores/${developerToDelete.id}`);
            // Remove o desenvolvedor do estado local
            setDevelopers((prev) => prev.filter((dev) => dev.id !== developerToDelete.id));
            toaster.create({
                title: 'O desenvolvedor foi removido com sucesso',
                type: 'success',
            })
            onModalExcClose();
            fetchDevelopers();
        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido ao adicionar desenvolvedor."
            toaster.create({
                title: 'O desenvolvedor não pode ser removido',
                description: errorMessage,
                type: 'error',
            })
            onModalExcClose();
        }
    };

    //Páginas
    // Lida com troca de páginas
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchDevelopers(page);
    };

    useEffect(() => {
        fetchDevelopers(currentPage);
    }, [currentPage]);

    return(
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            p='25px'
            gap='4'
            w='100%'
            h='100%'
        >
            {/* Barra de Busca */}
            <Box
            display='flex'
            alignItems='center'
            w='100%'
            >
                <NewDeveloperAndSearchBar onDevelopersUpdate={handleDevelopersUpdate} />
            </Box>
            <Stack
                direction='row'
                wrap='wrap'
                display='flex'
                alignItems='flex-start'
            >
            {developers.map((dev) => (
                <DeveloperCard
                    key={dev.id}
                    name={dev.nome}
                    level={dev.nivel.nivel}
                    sexo={dev.sexo}
                    birth_date={dayjs(dev.data_nascimento).format('DD/MM/YYYY')}
                    idade={dev.idade}
                    hobby={dev.hobby}
                    onEdit={() => openEditModal(dev)}
                    onDelete={() => openDeleteModal(dev)}
                />
            ))}
            </Stack>

            {/* Controles de Paginação */}
            {meta && (
                <Box display="flex" justifyContent="center" mt="4">
                    <HStack>
                        <Button
                            colorScheme="teal"
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Anterior
                        </Button>
                        <Text fontSize="lg" fontWeight="bold">
                            Página {currentPage} de {meta.last_page || 1}
                        </Text>
                        <Button
                            colorScheme="teal"
                            disabled={currentPage === meta.last_page || (meta.total <= currentPage * meta.per_page)}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Próxima
                        </Button>
                    </HStack>
                </Box>
            )}

            {/* Modal Excluir desenvolvedores */}
            <CustomModal
                title="Atenção!"
                mainButtonTitle='Sim'
                isOpen={isModalExcOpen}
                onClose={onModalExcClose}
                onSave={handleDeleteDeveloper}
                body={
                    <Text>Tem certeza que deseja remover PERMANENTEMENTE o desenvolvedor selecionado?</Text>
                }
            />

            {/* Modal de Edição */}
            <CustomModal
                title="Editar Desenvolvedor"
                mainButtonTitle='Salvar'
                isOpen={isModalEditOpen}
                onClose={onModalEditClose}
                onSave={handleEditDeveloper}
                body={
                    <>
                        <Field label="Nome:" required>
                        <Input
                            value={updatedDeveloper?.nome || ''}
                            onChange={(e) => setUpdatedDeveloper(prev => prev ? { ...prev, nome: e.target.value } : prev)}
                        />
                        </Field>

                        <Field label="Sexo:" required>
                        <Input
                            value={updatedDeveloper?.sexo || ''}
                            onChange={(e) => setUpdatedDeveloper(prev => prev ? { ...prev, sexo: e.target.value } : prev)}
                        />
                        </Field>

                        <Field label="Data de nascimento:" required>
                        <Input
                            type="date"
                            value={updatedDeveloper?.data_nascimento || ''}
                            onChange={(e) => setUpdatedDeveloper(prev => prev ? { ...prev, data_nascimento: e.target.value } : prev)}
                        />
                        </Field>

                        <Field label="Hobby:" required>
                        <Input
                            value={updatedDeveloper?.hobby || ''}
                            onChange={(e) => setUpdatedDeveloper(prev => prev ? { ...prev, hobby: e.target.value } : prev)}
                        />
                        </Field>

                        <Field label="Nivel:" required>
                        <Input
                            type="number"
                            value={updatedDeveloper?.nivel.id || ''}
                            onChange={(e) => setUpdatedDeveloper(prev => prev ? { ...prev, nivel: { id: parseInt(e.target.value), nivel: '' } } : prev)}
                        />
                        </Field>
                    </>
                }
            />
            <Toaster/>
        </Box>
    )
}

export default CustomDevelopersView;