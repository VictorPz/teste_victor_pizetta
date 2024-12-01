'use client'

import { useState } from 'react';
import { Stack, Box, Text, Input } from '@chakra-ui/react';
import DeveloperCard from '@/components/DeveloperCard';
import { useDisclosure } from '@chakra-ui/hooks'
import GenericButton from '@/components/GenericButton';
import CustomModal from '@/components/CustomModal';


type Developer = {
    id: number;
    name: string;
    level: string;
    sexo: string;
    birth_date: string;
    hobby: string;
};

const mockDevelopers: Developer[] = [
    { id: 1, name: 'João', level: 'Junior', sexo: 'M', birth_date: '10/10/1990', hobby: 'Futebol' },
    { id: 2, name: 'Maria', level: 'Pleno', sexo: 'F', birth_date: '13/05/1998', hobby: 'Leitura' },
    { id: 3, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 4, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 5, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 6, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 7, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 8, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 9, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 10, name: 'Pedro', level: 'Sênior', sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
];

const DeveloperPage = () => {
    //Barra busca
    const [searchQuery, setSearchQuery] = useState<string>('');

    //Modal edit dev
    const [developers, setDevelopers] = useState(mockDevelopers);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    //Modal add dev
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const [newDeveloper, setNewDeveloper] = useState<Developer | null>(null);

    const filteredDevelopers = developers.filter(dev =>
        dev.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //Modal confirmam exclusão
    const { isOpen: isModalExcOpen, onOpen: onModalExcOpen, onClose: onModalExcClose } = useDisclosure();

    const handleEdit = (developer: Developer) => {
        setSelectedDeveloper(developer);
        onOpen();
    };

    const handleSaveEdit = (name: string, level: string, sexo: string, birth_date: string, hobby: string) => {
        if (selectedDeveloper) {
            const updatedDevelopers = developers.map(dev =>
                dev.id === selectedDeveloper.id ? { ...dev, name, level, sexo, birth_date, hobby } : dev
            );
            setDevelopers(updatedDevelopers);
            onClose();
        }
    };

    const confirmDelete = () => {
        alert('Deletado!')
        onModalExcClose();
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
                    placeholder="Buscar desenvolvedor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado com o valor da busca
                    w='80%'
                    cursor='text'
                    backgroundColor='whiteAlpha.500'
                    color='black'
                    _placeholder={{ color: 'black' }}
                />
                <GenericButton size='lg' variant='subtle' title="Adicionar Desenvolvedor" color="blue" onClick={onAddOpen} />
            </Box>
            <Stack
                direction='row'
                wrap='wrap'
                display='flex'
                alignItems='flex-start'
            >
                {filteredDevelopers.map((developer) => (
                    <DeveloperCard
                        key={developer.id}
                        name={developer.name}
                        level={developer.level}
                        sexo={developer.sexo}
                        birth_date={developer.birth_date}
                        hobby={developer.hobby}
                        onEdit={() => handleEdit(developer)}
                        onDelete={onModalExcOpen}
                    />
                ))}
            </Stack>

            {/* Modal Confirmar exclusão */}
            <CustomModal
                title="Atenção!"
                isOpen={isModalExcOpen}
                onClose={onModalExcClose}
                onSave={confirmDelete}
                body={
                    <Text>Tem certeza que deseja remover PERMANENTEMENTE o desenvolvedor selecionado?</Text>
                }
            />

            {/* Modal editar Dev */}
            <CustomModal
                title="Editar Desenvolvedor"
                isOpen={isOpen}
                onClose={onClose}
                onSave={() => handleSaveEdit(
                    (document.getElementById('name') as HTMLInputElement).value,
                    (document.getElementById('level') as HTMLInputElement).value,
                    (document.getElementById('sexo') as HTMLInputElement).value,
                    (document.getElementById('birth_date') as HTMLInputElement).value,
                    (document.getElementById('hobby') as HTMLInputElement).value,
                )}
                body={
                    selectedDeveloper && (
                        <>
                            <Text mb='4px'>Nome:</Text>
                            <Input
                                type="text"
                                defaultValue={selectedDeveloper.name}
                                id="name"
                            />

                            <Text mb='4px' mt='10px'>Nivel:</Text>
                            <Input
                                type="text"
                                defaultValue={selectedDeveloper.level}
                                id="level"
                            />

                            <Text mb='4px' mt='10px'>Sexo:</Text>
                            <Input
                                type="text"
                                defaultValue={selectedDeveloper.sexo}
                                id="sexo"
                            />

                            <Text mb='4px' mt='10px'>Data de Nascimento:</Text>
                            <Input
                                type="text"
                                defaultValue={selectedDeveloper.birth_date}
                                id="birth_date"
                            />

                            <Text mb='4px' mt='10px'>Hobby:</Text>
                            <Input
                                type="text"
                                defaultValue={selectedDeveloper.hobby}
                                id="hobby"
                            />
                        </>
                    )
                }
            />

            {/*Modal Add Dev*/}
            <CustomModal
                title="Cadastrar Desenvolvedor"
                isOpen={isAddOpen}
                onClose={onAddClose}
                onSave={() => {
                    if (newDeveloper) {
                        setDevelopers([...developers, { ...newDeveloper, id: developers.length + 1 }]);
                        onAddClose();
                    }
                }}
                body={
                    <>
                        <Text mb='4px'>Nome:</Text>
                        <Input
                            type="text"
                            placeholder="Digite o nome"
                            onChange={(e) => setNewDeveloper((prev) => ({ ...prev, name: e.target.value } as Developer))}
                        />

                        <Text mb='4px' mt='10px'>Nível:</Text>
                        <Input
                            type="text"
                            placeholder="Digite o nível"
                            onChange={(e) => setNewDeveloper((prev) => ({ ...prev, level: e.target.value } as Developer))}
                        />

                        <Text mb='4px' mt='10px'>Sexo:</Text>
                        <Input
                            type="text"
                            placeholder="Digite o sexo"
                            onChange={(e) => setNewDeveloper((prev) => ({ ...prev, sexo: e.target.value } as Developer))}
                        />

                        <Text mb='4px' mt='10px'>Data de Nascimento:</Text>
                        <Input
                            type="date"
                            onChange={(e) => setNewDeveloper((prev) => ({ ...prev, birth_date: e.target.value } as Developer))}
                        />

                        <Text mb='4px' mt='10px'>Hobby:</Text>
                        <Input
                            type="text"
                            placeholder="Digite o hobby"
                            onChange={(e) => setNewDeveloper((prev) => ({ ...prev, hobby: e.target.value } as Developer))}
                        />
                    </>
                }
            />
        </Box>
    );
};

export default DeveloperPage;