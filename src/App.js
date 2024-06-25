import { useEffect,useState } from 'react'
import "./styles.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ChakraProvider,
  theme,
  Center,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Box,
  Spinner,
  Flex,
  flexbox,
  AspectRatio
  
} from '@chakra-ui/react'

import React from 'react'
import Modaladd from './componets/Modal'


import api from './services/api'


function App() {
  const [isModalVisible, setIsModalVisible] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isColumVisible, setIsColumVisible] = useState(true);
  const [idPut, setIdPut] = useState('');
  const [id, setId] = useState([]);
  const [validarBotao, setValidarBotao] = useState('');
  const [validarStatus, setValidarStatus] = useState('');
  const [buscar, setBuscar] = useState('');
  const [urlBuscar, setUrlBuscar] = useState('');
  const [Vagas, setVagas] = useState([''])

   



  useEffect(() => {
  
    api.get("vagas/pagamento?pagamento=Pendente")
      .then((response) => {

        setId(response.data)
        console.log(response.data)
        console.log('DEU certo')
        console.log(Vagas);
        console.log(response.data.dateTime);


      })
      .catch(() => {
        alert('Ops nada encontrado')
      })
    }, [])

async function  search (urlBuscar,buscar){

  api.get(`vagas/${urlBuscar}?${urlBuscar}=${buscar}`)
  .then((response) => {
    
    setId(response.data)
    console.log(response.data);
    console.log('DEU certo');
    setIsButtonVisible(false);
    setIsColumVisible(false);
    if(response.data.length == 0){ alert(`Nada encontrado com a palavra : ${buscar} .`)
      
    }
    
    

  })
  .catch(() => {
    console.log('Ops nada encontrado')

   
    alert('Ops !!! Nada encontrado...')
  })
  


}

function  BuscarNaVaga (buscar){

  api.get(`vagas/pagamento?pagamento=${buscar}`)
  .then((response) => {
    
    setId(response.data)
    console.log(response.data);
    console.log('DEU certo');
    
    setBuscar('');
    setIsButtonVisible(true);
    setIsColumVisible(true);
    
    

  })
  .catch(() => {
    console.log('Ops nada encontrado')
   
    alert('Ops !!! Nada encontrado...')
  })
  


}

async function buscarTodos(){

  api.get('vagas')
  .then(response => {
    
    console.log(response.data);
    setId(response.data);
    setBuscar('');
    setIsButtonVisible(false);
    setIsColumVisible(false);
   
  })
  .catch(error => {
    console.log(error);
  });

}



  
  function Delete(id) {



    api.delete(`vagas/delete/${id}`)
      .then(response => {
        console.log(`Deletado com sucesso : ${id}`);
        BuscarNaVaga('Pendente');
      })
      .catch(error => {
        console.error(error);
      });


     }


  function Editar(id) {

    setIsModalVisible(true);
    setIdPut(id);
    setValidarBotao(true);
    setValidarStatus(false);
    
    
  }

  function LiberarVaga(id) {
    
    setVagas ('');
    setIsModalVisible(true);
    setIdPut(id);
    setValidarBotao(false);
    setValidarStatus(false);
  }

  function Adicionar() {
    setIdPut();
    setIsModalVisible(true);
    setValidarBotao(true);
    setValidarStatus(false);
    
    
  }



   function handleKeyPress (evento) {
      if (evento.key === 'Enter') {
        search(urlBuscar,buscar);
      }}

  return (
    <Flex h='1000px'>
    <Box  bg='#E2E8F0' flex='3' w='100%'   h='100%'>
    <ChakraProvider  bg={'blue'} theme={theme}>
      <Center fontStyle={'oblique'} fontSize={40} color="Black" marginTop={1}>
        Cadastro de Veículos
      </Center>

      


        {isModalVisible ? <Modaladd
          abrirModal={() => setIsModalVisible(true)}
          fecharmodal={() => setIsModalVisible(false)}
          botaovisible={validarBotao}
          statusVisible={validarStatus}
          IdPut={idPut}
          NaVaga={() => BuscarNaVaga("Pendente")}
          
          
          >
        </Modaladd> : null}

          
        
        

        
        <Center > 
        <Box className='Menu'  borderRadius='md'  bg='teal' w={[300, 400, 500]} p={1} color='white'>
        
        <RadioGroup defaultValue={'Pendente'}>
        
            <Stack display='flex' margin={3} color={'black'} spacing={2} >
              <Radio  colorScheme='blue' value={'Pendente'} onChange={(e) => BuscarNaVaga (e.target.value)}  >
                Na Vaga
              </Radio>
              <Radio colorScheme='blue' value={"name"} onChange={(e) => setUrlBuscar (e.target.value)}  >
                Buscar por nome
              </Radio>
              <Radio   colorScheme='blue' value={"placa"} onChange={(e) => setUrlBuscar (e.target.value)} >
                Buscar por nº da placa
              </Radio>
              <Radio colorScheme='blue' value={'1'} onChange={()=>buscarTodos()} >
                Historico
              </Radio>
             <Center>
              <Input  color={'black'} bg='white'  htmlSize={4}  placeholder={'Digite aqui'} value={buscar}
              onChange={(e) => setBuscar(e.target.value)} onKeyPress={handleKeyPress}   />
            
              <Button w='70%' alignItems='center' marginInline={2}
              onClick={()=>search(urlBuscar,buscar)}> Buscar </Button>
             </Center>
            </Stack>
            </RadioGroup>
            </Box>
           
            </Center> 
            
            
      
              
              
              
        
            {isButtonVisible ? <Button
                  marginTop={50}
                  marginInline={10}
                  colorScheme="teal"
                  size="sm"
                  onClick={() => Adicionar()}
                >
                  Adicionar
                </Button> : null}
              
            <TableContainer   marginInline={10} scrollPaddingY={10} >    
              
            
                


               


                
          
          
          <Table size="sm" marginTop={3} scrollPaddingY={10}   >
            <TableCaption >@By: WILL SANTOS</TableCaption>

              
            
            
            <Thead >
              <Tr>
                {isColumVisible ? <Th>Nº de vagas ocupadas</Th> : null}
                <Th>Nome do cliente</Th>
                <Th>Marca do carro</Th>
                <Th>Modelo</Th>
                <Th>Placa</Th>
                <Th>Status</Th>
                <Th>Data</Th>
              </Tr>
            </Thead>

            {id.map((id,Vagas) => 
              
         
               (
                <Tbody key={Vagas}>
                  <Tr>
                    {isColumVisible ?<Td>{Vagas}</Td> : null}
                    <Td>{id.name}</Td>
                    <Td>{id.marcadocarro}</Td>
                    <Td>{id.modelo}</Td>
                    <Td>{id.placa}</Td>
                    <Td>{id.status.status}</Td>
                    <Td>{id.dateTime}</Td>
                    <Td>
                      {isButtonVisible ? <Button marginInline={2} colorScheme="teal" size="sm" onClick={() => Editar(id.id)}  >
                        Editar
                      </Button> : null}
                      {isButtonVisible ?<Button marginInline={2} colorScheme="teal" size="sm" onClick={() => Delete(id.id)}>
                        Remover
                      </Button> : null}
                      {isButtonVisible ? <Button marginInline={2} colorScheme="teal" size="sm" onClick={() => LiberarVaga(id.id)}  >
                        Liberar Vaga
                      </Button> : null}
                    </Td>
                  </Tr>
                </Tbody>
                
              )
            )}

          </Table> 
          
          
        </TableContainer> 
        
      
    </ChakraProvider>

            

    </Box>
    </Flex>
    
  )
}

export default App