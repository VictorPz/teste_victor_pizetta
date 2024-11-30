'use client'

import { useState } from 'react';
import { Stack, Box, Button, Text, Input} from '@chakra-ui/react';
import DeveloperCard from '@/components/DeveloperCard';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks'
import GenericButton from '@/components/GenericButton';


type Developer = {
    id: number;
    name: string;
    level: string;
    sexo: string;
    birth_date: string;
    hobby: string;
};

const mockDevelopers: Developer[] = [
    { id: 1, name: 'João', level: 'Junior', sexo: 'M', birth_date: '10/10/1990', hobby: 'Futebol'},
    { id: 2, name: 'Maria', level: 'Pleno', sexo: 'F', birth_date: '13/05/1998', hobby: 'Leitura'},
    { id: 3, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 4, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 5, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 6, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 7, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 8, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 9, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 10, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
    { id: 11, name: 'Pedro', level: 'Sênior',sexo: 'M', birth_date: '15/02/1996', hobby: 'Games' },
];

const DeveloperPage = () => {
    const [developers, setDevelopers] = useState(mockDevelopers);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredDevelopers = developers.filter(dev =>
        dev.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (developer: Developer) => {
        setSelectedDeveloper(developer);
        onOpen();
    };

    const handleDelete = (id: number) => {
        const updatedDevelopers = developers.filter(dev => dev.id !== id);
        setDevelopers(updatedDevelopers);
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
                <GenericButton size='lg' variant='subtle' title="Adicionar Desenvolvedor" color="blue" onClick={() => 'lul'} />
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
                        onDelete={() => handleDelete(developer.id)}
                    />
                ))}
            </Stack>

            {/* Modal para editar */}
            <Modal
            isOpen={isOpen}
            onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent
                border='solid'
                borderColor='green'
                display='flex'
                alignItems='center'
                justifyContent='center'
                h='100dvh'
                w='100dvw'
                >
                    <ModalHeader
                    backgroundColor='#0039f7'
                    w='300px'
                    display='flex'
                    justifyContent='space-between'
                    pt='10px'
                    pb='10px'
                    paddingInline='15px'
                    >
                        Editar Desenvolvedor
                        <ModalCloseButton/>
                    </ModalHeader>

                    <ModalBody
                    border='solid'
                    borderColor='blue'
                    backgroundColor='white'
                    w='300px'
                    p='34px'
                    >
                        {selectedDeveloper && (
                            <>
                                <Text>Nome:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.name}
                                    id="name"
                                />
                                <Text>Nivel:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.level}
                                    id="level"
                                />
                                <Text>Sexo:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.sexo}
                                    id="sexo"
                                />
                                <Text>Data de Nascimento:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.birth_date}
                                    id="birth_date"
                                />
                                <Text>Hobby:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.hobby}
                                    id="hobby"
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() =>
                            handleSaveEdit(
                                (document.getElementById('name') as HTMLInputElement).value,
                                (document.getElementById('level') as HTMLInputElement).value,
                                (document.getElementById('sexo') as HTMLInputElement).value,
                                (document.getElementById('birth_date') as HTMLInputElement).value,
                                (document.getElementById('hobby') as HTMLInputElement).value,
                            )}>Salvar</Button>
                        <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DeveloperPage;

