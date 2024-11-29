import { Card, HStack, Stack, Strong, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LuCheck, LuX } from "react-icons/lu"

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
                    <Strong color="fg">{name}. </Strong>
                    <br></br>
                    Desenvolvedor {level}
                    <br></br>
                    Sexo: {sexo}.
                    <br></br>
                    Data de nascimento: {birth_date}.
                    <br></br>
                    Principal hobby: {hobby}
                </Card.Description>
            </Card.Body>
            <Card.Footer>
                <Button variant="subtle" colorPalette="blue" flex="1" onClick={onEdit}>
                    <LuCheck />
                    Editar
                </Button>
                <Button variant="subtle" colorPalette="red" flex="1" onClick={onDelete}>
                    <LuX />
                    Excluir
                </Button>
            </Card.Footer>
        </Card.Root>
    )
}

export default DeveloperCard;
