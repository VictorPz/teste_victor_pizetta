'use client';
import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/tabs';
import { Box } from '@chakra-ui/react';
import DeveloperPage from './desenvolvedores/page'; // Importando a página de desenvolvedores
import LevelPage from './niveis/page'; // Importando a página de níveis
import { Theme } from "@chakra-ui/react"
import { useState } from 'react';

const MainPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Estado para gerenciar a aba selecionada

  const handleTabChange = (index: number) => {
    setSelectedIndex(index); // Atualiza o índice da aba selecionada
  };

  return (
    <Theme appearance="dark">
      <Box
        backgroundColor='#141723'
        display='flex'
        alignItems='center'
        justifyContent='center'
        h='100dvh'
        w='100dvw'
        >

        <Tabs
          index={selectedIndex} // Controla qual aba está selecionada
          onChange={handleTabChange} // Atualiza o estado ao mudar de aba
          backgroundColor='#F8F8FF'
          borderRadius='10px'
          h='95%'
          w='95%'
          >

          <TabList
            display='flex'
            alignItems='flex-start'
            backgroundColor='#36373b'
            borderTopRadius='8px'
            paddingTop='10px'
            >

            <Tab
            backgroundColor={selectedIndex === 0 ? '#1a3478' : '#141723'}
            _hover={{ bg: '#0039f7'}}
            _focus={{ bg: '#1a3478'}}
            borderTopLeftRadius='8px'
            borderTopRightRadius='8px'
            h='2.3em'
            w='12em'
            >
              Desenvolvedores
            </Tab>

            <Tab
            backgroundColor={selectedIndex === 1 ? '#1a3478' : '#141723'}
            _hover={{ bg: '#0039f7' }}
            _focus={{ bg: '#1a3478' }}
            borderTopLeftRadius='8px'
            borderTopRightRadius='8px'
            h='2.3em'
            w='12em'
            >
              Níveis
            </Tab>

          </TabList>

          <TabPanels
            borderBottomRadius='8px'
            borderTopRightRadius='8px'
            backgroundColor='gray.800'
            overflowY="auto"
            h='95%'
            >
            <TabPanel>
              {/* Renderiza a página de Desenvolvedores dentro da aba */}
              <DeveloperPage />
            </TabPanel>
            <TabPanel h='100%'>
              {/* Renderiza a página de Níveis dentro da aba */}
              <LevelPage/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Theme>
  );
};

export default MainPage;