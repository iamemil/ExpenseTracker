import React from 'react'
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tag,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon,ViewIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { useState, useCallback } from 'react'
import NewReceipt from '../../components/NewReceipt';
import ReceiptForm from '../../components/ReceiptForm';
import ReceiptService from '../../api/ReceiptService';
import {useNavigate} from 'react-router-dom';
export default function ReceiptHistory() {
  const receiptInitialState = {
    Id: "",
    storeName: "",
    storeAddress: "",
    companyName: "",
    companyTaxNumber: "",
    storeTaxNumber: "",
    receiptTotalSum: 0.00,
    receiptTimestamp: "",
    receiptItems: [],
    existing: false,
    tagId : null,
  }
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  //const [receipt, setReceiptData] = useState(receiptInitialState);
  const [existingReceipt, setExistingReceiptData] = useState(receiptInitialState);
  //const onExistingReceiptModalClose = () => setExistingReceipt({ isClicked: false, receiptId: null });

  const existingReceiptCallback = useCallback((receipt) => {
    setExistingReceiptData(receipt);
  }, []);
  function onExistingReceiptModalOpen(receiptId) {
    let receiptService = new ReceiptService();
    receiptService.getFromExternalSource(receiptId)
      .then(function (response) {
        setExistingReceiptData({
          Id: response.data.cheque.documentId,
          storeName: response.data.cheque.storeName,
          storeAddress: response.data.cheque.storeAddress,
          companyName: response.data.cheque.companyName,
          companyTaxNumber: response.data.cheque.companyTaxNumber,
          storeTaxNumber: response.data.cheque.storeTaxNumber,
          receiptTotalSum: response.data.cheque.content.sum,
          receiptTimestamp: new Date(response.data.cheque.content.createdAtUtc * 1000).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          receiptItems: response.data.cheque.content.items,
          existing: true,
          tagId: null
        });
        //existingReceiptCallback(existingReceipt);
        onOpen();
      })
      .catch(function (error) {
        console.log(error);
        return error
      })
      .then(function () {
        // always executed
      });

  }
  function onExistingReceiptModalClose() {
    setExistingReceiptData(receiptInitialState);
    onClose();
  }


  function closeModal() {
    onClose();
  }
  const data = React.useMemo(
    () => [
      {
        receiptId: "5QRDHY2EzxUQovEERaf3yrkBuGitygueRqTon5fcBCsv",
        merchantName: 'Starbucks',
        categoryName: 'Food&Drink',
        timestamp: '10:45, 01.01.2022',
        spentAmount: 25.4,
      },
      {
        receiptId: "HjJciKVPWj7Hojq52LU7G415pZy8dDJk16w4oq8pDBvW",
        merchantName: 'Bravo Supermarket',
        categoryName: 'Shopping',
        timestamp: '11:30, 02.01.2022',
        spentAmount: 40.48,
      },
      {
        receiptId: "EVLF6RsgSBytGApHPE4n1JEUGL9FbYqdwMYHDWDH4MS4",
        merchantName: 'Wolt',
        categoryName: 'Food&Drink',
        timestamp: '16:00, 03.01.2022',
        spentAmount: 9.14,
      },
      {
        receiptId: "ACim9ATs25omohKp6p1oeZu54JcPHYmHu6gSfDx9J7WY",
        merchantName: 'Starbucks',
        categoryName: 'Food&Drink',
        timestamp: '09:00, 04.01.2022',
        spentAmount: 14.5,
      },
    ],
    [],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Merchant',
        accessor: 'merchantName',
        Cell: (props) => {
          return (
            <Box fontWeight={"bold"}>
              {props.cell.value} <br /> <Text fontSize={'xs'} fontWeight={"normal"}>{props.row.values.timestamp}</Text>
            </Box>
          );
        },
      },
      {
        Header: 'Category',
        accessor: 'categoryName',
        Cell: ({ cell: { value } }) => <Tag colorScheme='teal'>{value}</Tag>,
      },
      {
        Header: 'Date&Time',
        accessor: 'timestamp',
      },
      {
        Header: 'Spent',
        accessor: 'spentAmount',
        isNumeric: true,
        Cell: ({ cell: { value } }) => <Text>{value} ₼</Text>,
      },
    ],
    [],
  )
  const initialState = { hiddenColumns: ['timestamp'] };
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data, initialState }, useSortBy)

  return (
    <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'}>
      <Table {...getTableProps()}
        colorScheme={'gray'}
        fontSize={'sm'}>
        <TableCaption placement={'top'} fontSize={'2xl'}>
          <HStack justifyContent={'space-between'}>
            <Text>Receipt History</Text>
            <HStack>
              <Button colorScheme='teal' variant='outline' onClick={() => navigate('/receipts')}>
              <ViewIcon boxSize={"1.5em"} />
              </Button>
              <NewReceipt />
            </HStack>
          </HStack>

        </TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl='4'>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label='sorted descending' />
                      ) : (
                        <TriangleUpIcon aria-label='sorted ascending' />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} onClick={() => {
                onExistingReceiptModalOpen(row.original.receiptId);
              }}>

                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} size={'xl'} onClose={onExistingReceiptModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt Details</ModalHeader>
          <ModalCloseButton onClick={onExistingReceiptModalClose} />
          <ModalBody>
            <ReceiptForm receipt={existingReceipt} receiptCallback={existingReceiptCallback} />
          </ModalBody>

          <ModalFooter>
            <Button variant={'outline'} width={'100%'} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}