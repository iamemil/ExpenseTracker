import React from 'react'
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Center,
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
import { TriangleDownIcon, TriangleUpIcon, ViewIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { useState, useCallback, useEffect } from 'react'
import NewReceipt from '../../components/NewReceipt';
import ReceiptForm from '../../components/ReceiptForm';
import ReceiptService from '../../api/ReceiptService';
import { useNavigate } from 'react-router-dom';
import { connect  } from "react-redux";
import { receiptDataNotModified } from '../../redux/actions/authAction';
function ReceiptHistory(props) {
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
    tagId: null,
  }
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [existingReceipt, setExistingReceiptData] = useState(receiptInitialState);
  const [loading, setLoading] = useState(false);

  let receiptService = new ReceiptService();

  const existingReceiptCallback = useCallback((receipt) => {
    setExistingReceiptData(receipt);
  }, []);
  function onExistingReceiptModalOpen(receiptId) {
    receiptService.getReceipt(receiptId)
      .then(function (response) {
        const timestamp = new Date(parseInt(response.data.receiptData[0].PurchaseDate.replace("/Date(", "").replace(")/", "")));
        setExistingReceiptData({
          Id: response.data.receiptData[0].OriginalReceiptId,
          storeName: response.data.receiptData[0].storeName,
          storeAddress: response.data.receiptData[0].storeAddress,
          storeTaxNumber: response.data.receiptData[0].storeTaxNumber,
          receiptTotalSum: response.data.receiptData[0].TotalSum.toFixed(2),
          receiptTimestamp: timestamp.toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          receiptItems: response.data.receiptData[0].receiptItems,
          existing: true,
          tagId: response.data.receiptData[0].StoreTagId
        });
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
  const [data, setData] = useState([]);


  useEffect(() => {
    setLoading(true);
    receiptService.getReceipts(5)
      .then((response) => {
        const data = response.data.data.map(receipt =>
        ({
          receiptId: receipt.OriginalReceiptId,
          merchantName: receipt.storeName,
          categoryName: receipt.tagName,
          timestamp: new Date(parseInt(receipt.PurchaseDate.replace("/Date(", "").replace(")/", ""))).toLocaleDateString('az-AZ', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
          spentAmount: receipt.TotalSum.toFixed(2),
        })
        )
        setData(data);
        if(props.store.receiptDataModified){
          props.onReceiptDataNotModified();
      }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [props.store.receiptDataModified]);

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

  if (data.length === 0 && !loading) {
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
      </Table>
      <Center>There are no receipts yet</Center>
      </Box>
    );
  }
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
function mapStateToProps(store) {
  return {
    store
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onReceiptDataNotModified: () => dispatch(receiptDataNotModified())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReceiptHistory);