import React from "react";
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
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { useState, useCallback, useEffect } from 'react'
import ReceiptForm from '../../components/ReceiptForm';
import ReceiptService from '../../api/ReceiptService';
import { connect } from "react-redux";
import { receiptDataNotModified } from '../../redux/actions/authAction';
function Receipts(props) {
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
                const datetime =new Date(parseInt(response.data.receiptData[0].PurchaseDate.replace("/Date(", "").replace(")/", "")));
                const timestamp =  datetime.setHours(datetime.getHours() - 9);
                setExistingReceiptData({
                    Id: response.data.receiptData[0].OriginalReceiptId,
                    storeName: response.data.receiptData[0].storeName,
                    storeAddress: response.data.receiptData[0].storeAddress,
                    storeTaxNumber: response.data.receiptData[0].storeTaxNumber,
                    receiptTotalSum: response.data.receiptData[0].TotalSum.toFixed(2),
                    receiptTimestamp: timestamp.toString(),
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
        receiptService.getReceipts()
            .then((response) => {
                const data = response.data.data.map(receipt =>
                ({
                    receiptId: receipt.OriginalReceiptId,
                    merchantName: receipt.storeName,
                    categoryName: receipt.tagName,
                    timestamp: new Date(new Date(parseInt(receipt.PurchaseDate.replace("/Date(", "").replace(")/", ""))).setHours(new Date(parseInt(receipt.PurchaseDate.replace("/Date(", "").replace(")/", ""))).getHours() - 9)).toLocaleString('az-AZ',{day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',second:'2-digit'}),
                    spentAmount: receipt.TotalSum.toFixed(2),
                })
                )
                setData(data);
                if (props.store.receiptDataModified) {
                    props.onReceiptDataNotModified();
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    }, [props.store.receiptDataModified]);

    // Define a default UI for filtering
    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = React.useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
        }, 200)

        return (
            <span>
                Search:{' '}
                <input
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${data.length} receipts...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </span>
        )
    }



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
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state } =
        useTable({ columns, data, initialState },
            useFilters,
            useGlobalFilter, useSortBy)
    if (data.length === 0 && !loading) {
        return (
            <Box mx='6'>
                <Center width={'full'} my={6}>
                    <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'}>
                        <Table {...getTableProps()}
                            colorScheme={'gray'}
                            fontSize={'sm'}>
                            <TableCaption placement={'top'} fontSize={'2xl'}>
                            <Center>
                                <Text>My Receipts</Text>
                            </Center>

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
                        </Table><Center>There are no receipts yet</Center>
                    </Box>
                </Center>
            </Box>
        );
    }
    return (
        <Box mx='6'>
            <Center width={'full'} my={6}>
                <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'}>
                    <Table {...getTableProps()}
                        colorScheme={'gray'}
                        fontSize={'sm'}>
                        <TableCaption placement={'top'} fontSize={'2xl'}>
                            <Center>
                                <Text>My Receipts</Text>
                            </Center>

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
                            <Tr>
                                <Th
                                    colSpan={visibleColumns.length}
                                    style={{
                                        textAlign: 'left',
                                    }}
                                >
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        globalFilter={state.globalFilter}
                                        setGlobalFilter={setGlobalFilter} />
                                </Th>
                            </Tr>
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
            </Center>
        </Box>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Receipts);