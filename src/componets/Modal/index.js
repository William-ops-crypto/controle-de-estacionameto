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
  Stack,
  Button, 
  FormControl,
  FormLabel,
  Input,
}
  from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import api from '../../services/api'

const Modaladd = ({ abrirModal, fecharmodal, IdPut,botaovisible, statusVisible,NaVaga}) => {
  const [isButtonVisible, setIsButtonVisible] = useState(botaovisible);
  const [isStatusVisible, setIsStatusVisible] = useState(statusVisible);
  const [name, setName] = useState('');
  const [marcaDoCarro, setMarcaDoCarro] = useState('');
  const [modelo, setModelo] = useState('');
  const [placa, setPlaca] = useState('');
  const [dateTime, setdateTime] = useState('');
  const [statusPagamento, setStatusPagamento] = useState('');
  const [status, setStatus] = useState('');
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [id, setId] = useState([])

    useEffect(() => {
    api.get(`vagas/get/${IdPut}`)
      .then((response) => {
        setId(response.data)
        console.log(response.data)
        setName(response.data.name)
        setStatusPagamento(response.data.pagamento)
        setMarcaDoCarro(response.data.marcadocarro)
        setModelo(response.data.modelo)
        setPlaca(response.data.placa)
        setdateTime(response.data.dateTime)
        setStatus(JSON.stringify(response.data.status.id))
      })
      .catch(() => {
        console.log('Ops nada encontrado')
      })
  }, [])
  
  async function Post() {
    api.post('vagas/post', {
      name: name,
      pagamento: "Pendente",
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,
      dateTime:new Date().toLocaleString(),
      status: {
        id: 1,
      }
      }, useEffect,)
      .then(function (response) {
        fecharmodal();
        NaVaga();
        
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert('Campos invalidos');
      });
  }
  
  async function Update(IdPut) {
    api.put(`vagas/put/${IdPut}`, {
      id: `${IdPut}`,
      pagamento:statusPagamento,
      name: name,
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,
      dateTime:dateTime,
      status: {
        id: status,
      }
      }, useEffect,)
      .then(function (response) {
        fecharmodal();
        NaVaga();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function RealizarPagamento(IdPut){
    
    LiberarVaga(IdPut);
  }
  
  async function LancarHistorico(IdPut) {
    api.put(`vagas/put/${IdPut}`, {
      id: `${IdPut}`,
      pagamento: "Pago",
      name: name,
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,
      dateTime: new Date().toLocaleString(),
      status: {
        id: 2,
      }
      }, useEffect,)
      .then(function (response) {
        alert('Pagamento realizado com sucesso.')
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  async function LiberarVaga(IdPut) {
    api.put(`vagas/put/${IdPut}`, {
      pagamento: "Pago",
      name: name,
      marcadocarro: marcaDoCarro,
      modelo: modelo,
      placa: placa,
      dateTime:dateTime,
      status: {
        id: 1,
      }
      }, useEffect,)
      .then(function (response) {
        LancarHistorico(IdPut);
        alert('Valor a pagar: R$: 10,00');
        fecharmodal();
        NaVaga();
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function  BuscarNaVaga (){
    api.get("vagas/pagamento?pagamento=pendente")
    .then((response) => {
      setId(response.data)
      console.log(response.data);
      console.log('DEU certo');
    }, useEffect,)
    .catch(() => {
      console.log('Ops nada encontrado')
      alert('Ops !!! Nada encontrado...')
    })
    }
  function Salvar(){
    if(IdPut==''){Post();}
    else{Update(IdPut)}
    }

    function CancelarModal(){
      
      isStatusVisible(false);
      }

  
    return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={abrirModal}
      onClose={fecharmodal}
      
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Adicionar Veiculo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input placeholder={name?name:"Digite o nome"} value={name}
              onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Marca do carro</FormLabel>
            <Input placeholder={marcaDoCarro?marcaDoCarro:"Digite a marca do carro"} value={marcaDoCarro}
              onChange={(e) => setMarcaDoCarro(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Modelo</FormLabel>
            <Input placeholder={modelo?modelo:"Digite o modelo do carro"} value={modelo}
              onChange={(e) => setModelo(e.target.value)} />
          </FormControl>

          <FormControl >
            <FormLabel>Placa</FormLabel>
            <Input placeholder={placa?placa:"Digite a Placa ***-****"} value={placa}
              onChange={(e) => setPlaca(e.target.value)} />
          </FormControl>


          {isStatusVisible ?<FormControl mt={4}>
            <FormLabel>Status</FormLabel>
          </FormControl> : null}

          <RadioGroup defaultValue={status}>
            <Stack spacing={5} direction='row'>
              {isStatusVisible ?
              <Radio colorScheme='green' value={'1'} onChange={(e) => setStatus(e.target.value)}>
                Entrada
              </Radio> : null}
              {isStatusVisible ?
              <Radio colorScheme='red' value={'2'} onChange={(e) => setStatus(e.target.value)}>
                Saida
              </Radio> : null}
            </Stack>
          </RadioGroup>
        </ModalBody>

        <ModalFooter>
          
          {isButtonVisible ?
           <Button colorScheme="blue" mr={3} onClick={() => Salvar()}>
               Salvar
            </Button> :
          <Button colorScheme="blue" mr={3} onClick={() => RealizarPagamento(IdPut)}>
              Realizar Pagamento
            </Button> 
          }
          <Button colorScheme="red" mr={3} onClick={fecharmodal}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  )
}
export default Modaladd;