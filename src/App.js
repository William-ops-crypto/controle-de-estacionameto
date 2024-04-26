import {  FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'
import {
  ChakraProvider,
  theme,
  Center,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  
  Radio, 
  RadioGroup,
  Stack 
  
} from '@chakra-ui/react'

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import axios, { formToJSON } from 'axios'






import { Button, ButtonGroup } from '@chakra-ui/react'

import { useState } from 'react'



import React from 'react'
import Modaladd from './componets/Modal'
import ModalEdit from './componets/ModalEdit'
import Table1 from './componets/Table1'
function App() {
  const [isModalVisible, setIsModalVisible] = useState('');



  const [name, setName] = useState('');
  const [marcaDoCarro, setMarcaDoCarro] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [status, setStatus] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [idPut, setIdPut] = useState();
  const [controlador, setControlador] = useState();

  
  const [id, setId] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/vagas')
      .then((response) => {
        // const response = await api.get(`${input}`);
        setId(response.data)
        console.log(response.data)
        console.log('DEU certo')

        // console.log(response);
      })
      .catch(() => {
        alert('Ops nada encontrado')
      })
  },[] )



  async function Post (){

    axios.post('http://localhost:8080/vagas/post',  	{
 	
      
      name: name,
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,

      status: {
        id: status,
        
        
      
      
      }
      
    
      
    },useEffect,)
    .then(function (response) {
      
      window.location.reload();
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      alert('Campos invalidos');
      
    });

  }

  async function Update (idPut){
  
    axios.put(`http://localhost:8080/vagas/put/${idPut}`,  	{
      
      id:`${idPut}`,
      name: name,
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,

      status: {
        id: status,
        
        
      
      
      }
      
    
      
    },useEffect,)
    .then(function (response) {
      
      window.location.reload();
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      console.log (idPut);
      alert(idPut);
      
    });
 


  }





  function Delete(id){

    

axios.delete(`http://localhost:8080/vagas/delete/${id}`)
  .then(response => {
    console.log(`Deletado com sucesso : ${id}`);
    window.location.reload();
  })
  .catch(error => {
    console.error(error);
  });


  }


    function Editar(id){
      setIdPut(id);
      onOpen(true);
      }  
  
    function Adicinar(id){
        setIdPut('Para atalizar clique no botão editar em um dos itens a direita.');
        onOpen(true);
        }      




 









  return (
    <ChakraProvider theme={theme}>
      <Center fontStyle={'oblique'} fontSize={40} color="Black" marginTop={10}>
        Controle de fluxo estacionamento
      </Center>

      <div>


     {isModalVisible ? <Modaladd
       abrirModal={onClose} 
      fecharmodal={()=>setIsModalVisible(false)} 
      setName={setName} 
       setMarcaDoCarro={setMarcaDoCarro}
      setModelo={setModelo}
      setPlaca={setPlaca}
      salvar={()=>Post()}
      setStatus={setStatus}
       nome={id.name}

       
       
      >
       
      </Modaladd> : null}


       {isModalVisible ? <ModalEdit
       abriModal={onOpen} 
       fecharmodal={()=>setIsModalVisible(false)} 
       setName={setName} 
       setMarcaDoCarro={setMarcaDoCarro}
       setModelo={setModelo}
       setPlaca={setPlaca}
       salvar={()=>Post()}
       setStatus={setStatus}
       nome={id.name}
       id={id}

       
       
       >
       
       </ModalEdit> : null}

     
     
     
     
     
     
     
      <Modaladd   initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={onOpen}
          onClose={onClose}/>
      

      <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          > 
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Veiculo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome</FormLabel>
                <Input ref={initialRef} placeholder={id.name} value={name}
            onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel>Marca do carro</FormLabel>
                <Input  placeholder="Digite a Marca do carro" value={marcaDoCarro}
            onChange={(e) => setMarcaDoCarro(e.target.value)}/>
              </FormControl>

              <FormControl>
                <FormLabel>Modelo</FormLabel>
                <Input placeholder="Digite o modelo" value={modelo}
            onChange={(e) => setModelo(e.target.value)} />
              </FormControl>

              <FormControl >
                <FormLabel>Placa</FormLabel>
                <Input placeholder={placa} value={placa}
            onChange={(e) => setPlaca(e.target.value)} />
              </FormControl>
            
           
              <FormControl mt={4}>
            <FormLabel>Status</FormLabel>
            </FormControl>
            
              
              
              <RadioGroup defaultValue=''>
               <Stack spacing={5} direction='row'>
               <Radio colorScheme='green' value={'1'} onChange={(e) => setStatus(e.target.value)}>
                Entrada
               </Radio>
               <Radio colorScheme='green' value={'2'} onChange={(e) => setStatus(e.target.value)}>
                Saida
              </Radio>
               </Stack>
              </RadioGroup>
              </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={()=>Update(idPut)}>
                Atualizar
              </Button>
              <Button colorScheme="blue" mr={3} onClick={()=>Post()}>
                Salvar
              </Button>
              <Button onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      
    


      


        












        <TableContainer marginInline={20}>
          <Table size="sm" marginTop={20} scrollPaddingY={20}>
            <TableCaption>@By: WILL SANTOS</TableCaption>

            <Thead>
              <Tr>
                {' '}
                <Button
                  marginInline={2}
                  colorScheme="teal"
                  size="sm"
                  onClick={()=>setIsModalVisible(true)}
                >
                  Adicionar
                </Button>
         
              </Tr>

              <Tr>
                <Th>Nome do cliente</Th>
                <Th>Marca do carro</Th>
                <Th>Modelo</Th>
                <Th>Placa</Th>
                <Th>Status</Th>
                <Th>Data</Th>
              </Tr>
            </Thead>

            {id.map((id) => {
              return (
                <Tbody>
                  <Tr>
                    <Td>{id.name}</Td>
                    <Td>{id.marcadocarro}</Td>
                    <Td>{id.modelo}</Td>
                    <Td>{id.placa}</Td>
                    <Td>{id.status_.status}</Td>
                    <Td>{id.dateTime}</Td>
                    <Td>
                      <Button marginInline={2} colorScheme="teal" size="sm"  onClick={()=>Editar(id.id)}  >
                        Editar
                      </Button>
                      <Button marginInline={2} colorScheme="teal" size="sm" onClick={()=>Delete(id.id)}>
                        Remover
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              )
            })}
            
          </Table>
        </TableContainer>
      
      
      
      
      
      
      
      
      
      
      
      </div>
    </ChakraProvider>
  )
}

export default App