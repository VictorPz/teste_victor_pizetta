import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/modal';
import { Box, Button} from '@chakra-ui/react';
import GenericButton from '@/components/GenericButton';

interface CustomModalProps {
    title: string;
    mainButtonTitle: string;
    body: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ title, mainButtonTitle, body, isOpen, onClose, onSave }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="100dvh"
                w="100dvw"
            >
                <ModalHeader
                    borderTopRadius='10px'
                    backgroundColor="#1a3478"
                    w="480px"
                    display="flex"
                    justifyContent="space-between"
                    pt="10px"
                    pb="10px"
                    paddingInline="15px"
                >
                    {title}
                    <ModalCloseButton />
                </ModalHeader>

                <ModalBody
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    flexDirection='column'
                    borderBottomRadius='10px'
                    backgroundColor="#111111"
                    w="480px"
                    p="34px"
                >
                    <Box
                    w='90%'
                    >
                        {body}
                    </Box>

                    <Box
                    w='90%'
                    display='flex'
                    justifyContent='space-around'
                    gap='8'
                    mt='25px'
                    >
                        <GenericButton size='sm' variant='subtle' title={mainButtonTitle} color="blue" onClick={onSave} />
                        <GenericButton size='sm' variant='outline' title="Cancelar" color="red" onClick={onClose} />
                    </Box>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;