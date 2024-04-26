import { Button, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react'

import {
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
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios, { formToJSON } from 'axios'

const ModalEdit = ({abriModal,nome,fecharmodal,salvar,setName,marcaDoCarro,setMarcaDoCarro,modelo,setModelo,placa,setPlaca,setStatus}) => {
  
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
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
    
    

   {id.map((id) => {
    return (
      
        
      

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={abriModal}
          onClose={fecharmodal}
        >
         <ModalOverlay />
          <ModalContent>
            <ModalHeader>Adicionar Veiculo</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nome2</FormLabel>
                <Input ref={initialRef} placeholder={id.name}
            onChange={(e) => setName(e.target.value)} />
              </FormControl>

              <FormControl>
                <FormLabel>Marca do carro</FormLabel>
                <Input  placeholder={id.marcaDoCarro}
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
              <Button colorScheme="blue" mr={3} >
                Atualizar
              </Button>
          
              <Button onClick={fecharmodal}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
   
     
    )})
    }}


  export default ModalEdit;