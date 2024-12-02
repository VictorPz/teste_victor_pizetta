import { useState, useEffect } from "react";
import { Box, Input} from "@chakra-ui/react";
import { createListCollection } from "@chakra-ui/react"
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import api from "@/api/axiosConfig";
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"
import { Toaster, toaster } from "@/components/ui/toaster"
import GenericButton from "@/components/GenericButton";
import CustomModal from "@/components/CustomModal";

//Relacionado a barra de busca. Evita multiplas requests já que não estamos buscando pressionando Enter
const useDebouncedSearch = (query: string, delay: number) => {
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, delay);

        return () => clearTimeout(timer); // Limpar o timer se a query mudar antes do tempo
    }, [query, delay]);

    return debouncedQuery;
};

const NewDeveloperAndSearchBar = ({ onDevelopersUpdate }: { onDevelopersUpdate: (developers: any[]) => void }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [newDeveloper, setNewDeveloper] = useState({
        nome: "",
        sexo: "",
        data_nascimento: "",
        hobby: "",
        nivel_id: "",
    });

    //Debounce para a busca
    const [searchQuery, setSearchQuery] = useState("");
    const [searchField, setSearchField] = useState("nome");
    const debouncedQuery = useDebouncedSearch(searchQuery, 500); // Delay de 500ms

    const busca = createListCollection({
        items: [
            { label: "Nome", value: "nome" },
            { label: "Sexo", value: "sexo" },
            { label: "Data de Nascimento", value: "data_nascimento" },
            { label: "Hobby", value: "hobby" },
            { label: "Nível", value: "nivel_id" }
        ],
    })

    // Realiza a busca de desenvolvedores
    const handleSearch = async () => {
        try {
            let query = debouncedQuery;
            dayjs.extend(customParseFormat);

            if (searchField === "data_nascimento" && query) {
                console.log("Tipo de query:", typeof query); // Verifica o tipo da variável query
                const date = dayjs(query, "DD/MM/YYYY", true); // Converte com o formato explícito e modo estrito
                if (date.isValid()) {
                    console.log("Data válida:", date.toDate()); // Converte para um objeto Date (opcional)
                    const formattedDate = date.format("YYYY-MM-DD"); // Formata no padrão esperado pelo backend
                    query = formattedDate; // Atualiza a query com a data convertida
                } else {
                    console.log("Data inválida");
                }
            }
            // Construção do parâmetro de busca dinamicamente com base no campo selecionado
            const params: { [key: string]: string } = {};

            // A busca só é feita se houver algum valor no campo de busca
            if (query) {
                params[searchField] = query; // Aplica o filtro selecionado com o valor da busca
            }

            // Faz a requisição para a API com os parâmetros
            const response = await api.get("/desenvolvedores", { params });
            onDevelopersUpdate(response.data.data); // Atualiza a lista de desenvolvedores no componente pai
        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido ao buscar desenvolvedores.";
            toaster.create({
                title: "Falha ao buscar:",
                description: errorMessage,
                type: "error",
            });
        }
    };

    // Adiciona um novo desenvolvedor
    const handleAddDeveloper = async () => {
        try {
            const payload = {
                ...newDeveloper,
                nivel_id: parseInt(newDeveloper.nivel_id),
            };
            await api.post("/desenvolvedores", payload);
            setAddModalOpen(false);
            const updatedDevelopers = await api.get("/desenvolvedores");
            onDevelopersUpdate(updatedDevelopers.data.data); // Notifica o componente pai
            toaster.create({
                title: 'O desenvolvedor foi criado com sucesso',
                type: 'success',
            })

        } catch (error: any) {
            const errorMessage = error.response?.data.message || "Erro desconhecido ao adicionar desenvolvedor."
            toaster.create({
                title: 'Erro ao adicionar desenvolvedor:',
                description: errorMessage,
                type: 'error',
            });
        }
    };

    useEffect(() => {
        if (!debouncedQuery) {
            handleSearch(); // Chama a função de busca sempre que os parâmetros forem atualizados
        } else {
            handleSearch();
        }
    }, [debouncedQuery, searchField]);

    return (
        <Box
            display='flex'
            gap='5'
            w='95%'
        >
            {/* Barra de busca */}
            <Input
                placeholder="Buscar desenvolvedor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                w="80%"
                cursor="text"
                backgroundColor="whiteAlpha.500"
                color="black"
                _placeholder={{ color: "black" }}
            />
            <Box>
                <SelectRoot
                collection={busca}
                size='md'
                w='150px'
                backgroundColor='#111111'
                borderRadius='8px'
                onChange={(e: any) => setSearchField(e.target.value)}
                >
                    <SelectTrigger>
                        <SelectValueText placeholder="Busca por:" />
                    </SelectTrigger>
                    <SelectContent>
                        {busca.items.map((buscaItem) => (
                            <SelectItem key={buscaItem.value} item={buscaItem}>
                                {buscaItem.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </SelectRoot>
            </Box>
            <Box>
            <GenericButton
                size="lg"
                variant="subtle"
                title="Adicionar Desenvolvedor"
                color="blue"
                onClick={() => setAddModalOpen(true)} // Abre o modal de adição
            />
            </Box>

            {/* Modal de adicionar desenvolvedor */}
            <CustomModal
                title="Adicionar Desenvolvedor"
                mainButtonTitle="Salvar"
                body={
                    <Box display="flex" flexDirection="column" gap="4">
                        <Input
                            placeholder="Nome"
                            value={newDeveloper.nome}
                            onChange={(e) => setNewDeveloper({ ...newDeveloper, nome: e.target.value })}
                        />
                        <Input
                            placeholder="Sexo (M/F)"
                            value={newDeveloper.sexo}
                            onChange={(e) => setNewDeveloper({ ...newDeveloper, sexo: e.target.value })}
                        />
                        <Input
                            type="date"
                            placeholder="Data de Nascimento"
                            value={newDeveloper.data_nascimento}
                            onChange={(e) => setNewDeveloper({ ...newDeveloper, data_nascimento: e.target.value })}
                        />
                        <Input
                            placeholder="Hobby"
                            value={newDeveloper.hobby}
                            onChange={(e) => setNewDeveloper({ ...newDeveloper, hobby: e.target.value })}
                        />
                        <Input
                            type="number" // Garante que o input será numérico
                            placeholder="ID do Nível"
                            value={newDeveloper.nivel_id}
                            onChange={(e) => setNewDeveloper({ ...newDeveloper, nivel_id: e.target.value })}
                        />
                    </Box>
                }
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)} // Fecha o modal
                onSave={handleAddDeveloper} // Salva o novo desenvolvedor
            />
            <Toaster/>
        </Box>
    );
};

export default NewDeveloperAndSearchBar;
