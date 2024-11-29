'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/tabs';
import { Box } from '@chakra-ui/react';

import DeveloperPage from './desenvolvedores/page'; // Importando a página de desenvolvedores
import LevelPage from './niveis/page'; // Importando a página de níveis
import { GiTreeSwing } from 'react-icons/gi';

const MainPage = () => {
  return (
    // pai
    <Box
      border='solid'
      borderColor='red'
      borderRadius='10px'
      backgroundColor='gray.800'
      display='flex'
      alignItems='center'
      justifyContent='center'
      h='100dvh'
      w='100dvw'>

      {/* filho */}
      <Tabs
        // border='solid'
        borderColor='green'
        backgroundColor='gray'
        borderRadius='10px'
        h='95%'
        w='95%'>

        <TabList
          display='flex'
          alignItems='flex-start'
          // border='solid'
          borderColor='blue'
          backgroundColor='#4F4F4F'
          borderTopRadius='8px'
          paddingTop='10px'
          >

          <Tab
          backgroundColor='violet'
          _hover={{bg: 'blue'}}
          _focus={{bg: 'green'}}
          borderTopLeftRadius='8px'
          borderTopRightRadius='8px'
          h='2.3em'
          w='12em'
          >
            Desenvolvedores
          </Tab>

          <Tab
          backgroundColor='violet'
          _hover={{ bg: 'blue' }}
          _focus={{ bg: 'green' }}
          borderTopLeftRadius='8px'
          borderTopRightRadius='8px'
          h='2.3em'
          w='12em'
          >
            Níveis
          </Tab>

        </TabList>

        <TabPanels
          // border='solid'
          borderColor='orangered'
          borderBottomRadius='8px'
          borderTopRightRadius='8px'
          backgroundColor='gray.800'
          h='85%'>
          <TabPanel>
            {/* Renderiza a página de Desenvolvedores dentro da aba */}
            <DeveloperPage />
          </TabPanel>
          <TabPanel>
            {/* Renderiza a página de Níveis dentro da aba */}
            <LevelPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MainPage;