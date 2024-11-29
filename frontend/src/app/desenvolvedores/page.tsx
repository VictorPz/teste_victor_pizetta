'use client'

import { useState } from 'react';
import { Stack, Box, Button, Text} from '@chakra-ui/react';
import {Card, CardBody} from '@chakra-ui/card'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal';
import { useDisclosure } from '@chakra-ui/hooks'


type Developer = {
    id: number;
    name: string;
    level: string;
};

const mockDevelopers: Developer[] = [
    { id: 1, name: 'João', level: 'Junior' },
    { id: 2, name: 'Maria', level: 'Pleno' },
    { id: 3, name: 'Pedro', level: 'Sênior' },
];

const DeveloperPage = () => {
    const [developers, setDevelopers] = useState(mockDevelopers);
    const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEdit = (developer: Developer) => {
        setSelectedDeveloper(developer);
        onOpen();
    };

    const handleDelete = (id: number) => {
        const updatedDevelopers = developers.filter(dev => dev.id !== id);
        setDevelopers(updatedDevelopers);
    };

    const handleSaveEdit = (name: string, level: string) => {
        if (selectedDeveloper) {
            const updatedDevelopers = developers.map(dev =>
                dev.id === selectedDeveloper.id ? { ...dev, name, level } : dev
            );
            setDevelopers(updatedDevelopers);
            onClose();
        }
    };

    return (
        <Box
            border='solid'
            borderColor='blue'
            p='15px'
            >
            <Stack
            direction='row'
            wrap='wrap'
            display='flex'
            alignItems='flex-start'
            justifyContent='space-between'
            >
                {developers.map((developer) => (
                    <Card
                    key={developer.id}
                    maxW="sm"
                    borderRadius='8px'
                    boxShadow="lg"
                    backgroundColor='#A9A9A9'
                    border='solid'
                    borderColor='green'
                    p='15px'
                    w='20em'
                    >
                        <CardBody>
                            <Text fontSize="lg">Nome: {developer.name}</Text>
                            <Text>Nível: {developer.level}</Text>
                            <Box
                            // border='solid'
                            borderColor='green'
                            display='flex'
                            justifyContent='space-between'
                            pt='15px'
                            >
                                <Button onClick={() => handleEdit(developer)}>Editar</Button>
                                <Button onClick={() => handleDelete(developer.id)} colorScheme="red">Excluir</Button>
                            </Box>
                        </CardBody>
                    </Card>
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
                                <Text>Level:</Text>
                                <input
                                    type="text"
                                    defaultValue={selectedDeveloper.level}
                                    id="level"
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => handleSaveEdit((document.getElementById('name') as HTMLInputElement).value, (document.getElementById('level') as HTMLInputElement).value)}>Salvar</Button>
                        <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DeveloperPage;

