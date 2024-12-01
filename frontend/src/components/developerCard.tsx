import { Card, HStack, Stack, Strong, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import GenericButton from '@/components/GenericButton';

type CustomCardProps = {
    key: number;
    name: string;
    level: string;
    sexo: string;
    birth_date: string;
    hobby: string;
    onEdit: () => void;
    onDelete: () => void;
};

const DeveloperCard = ({ name, level, sexo, birth_date, hobby, onEdit, onDelete }: CustomCardProps) => {
    return (
        <Card.Root width="325px" m='10px'>
            <Card.Body>
                <HStack mb="6" gap="3">
                    <Avatar
                        src='../assets/dev.jpg'
                        name='developer img'
                    />
                    <Stack gap="0">
                        <Text fontWeight="semibold" textStyle="sm">
                            {name}
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                            {level}
                        </Text>
                    </Stack>
                </HStack>
                <Card.Description>
                    <Strong color="fg">{name} </Strong>
                    <br></br>
                    Desenvolvedor {level}
                    <br></br>
                    Sexo: {sexo}
                    <br></br>
                    Data de nascimento: {birth_date}
                    <br></br>
                    Principal hobby: {hobby}
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <GenericButton size='md' variant='subtle' title="Editar" color="blue" onClick={onEdit} />
                <GenericButton size='md' variant='outline' title="Excluir" color="red" onClick={onDelete}/>
            </Card.Footer>
        </Card.Root>
    )
}

export default DeveloperCard;
