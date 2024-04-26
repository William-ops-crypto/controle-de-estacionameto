
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

const Table1 = () =>{


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
                <Button
                  marginInline={2}
                  colorScheme="teal"
                  size="sm"
                  onClick ={isOpen}
                >
                  Adicionar2
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
}

export default Table1;