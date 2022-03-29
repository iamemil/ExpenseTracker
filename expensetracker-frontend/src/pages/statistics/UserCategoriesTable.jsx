import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Text,
    Button,
    Table,
    Thead,
    Tbody,
    Center,
    Tr,
    Th,
    Td,
    TableCaption,
    chakra,
    Flex,
    IconButton,
    Tooltip,
    Select
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons'
import { useTable, useSortBy, usePagination } from 'react-table'
import { useState, useEffect, useRef } from 'react'
import StoreTagService from '../../api/StoreTagService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function UserCategoriesTable(props) {
    const [data, setData] = useState([]);
    const cancelRef = useRef();
    const [removeItemConfirm, setRemoveItemConfirm] = useState({ isConfirmOpen: false, itemIndex: null });
    const onRemoveItemDialogClose = () => setRemoveItemConfirm({ isConfirmOpen: false, itemIndex: null });
    const MySwal = withReactContent(Swal);

    let storeTagService = new StoreTagService();
    useEffect(() => {
        storeTagService.getStoreTags(false)
            .then((response) => {
                if (response.data.status == 200) {
                    setData(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function removeItemFromList() {
        storeTagService.deleteStoreTag(removeItemConfirm.itemIndex)
            .then((response) => {
                if (response.data.status == 200) {
                    MySwal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success'
                    })
                } else {
                    MySwal.fire({
                        title: 'Warning',
                        text: response.data.message,
                        icon: 'warning'
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        onRemoveItemDialogClose();
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Name',
                Cell: (props) => {
                    return (props.cell.value);
                },
            },
        ],
        [],
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize } }
        = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0, pageSize: 5 },
            }, useSortBy, usePagination)

    if (data.length === 0) {
        return (
            <><Table {...getTableProps()}
                colorScheme={'gray'}
                fontSize={'sm'}>
                <TableCaption placement={'top'} fontSize={'2xl'}>

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
            </Table><Center>Not enough data to show</Center></>
        );
    }
    return (
        <><Table {...getTableProps()}
            colorScheme={'gray'}
            fontSize={'sm'}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <><Th
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
                            </Th><Th></Th></>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <><Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                    {cell.render('Cell')}
                                </Td>
                                <Td>
                                    <Button colorScheme='red' size={'sm'} variant='outline' onClick={() => setRemoveItemConfirm({ isConfirmOpen: true, itemIndex: row.original.Id })}>
                                        <DeleteIcon />
                                    </Button>
                                </Td></>
                            ))}

                        </Tr>

                    );
                })}
            </Tbody>
        </Table><Flex justifyContent="space-between" m={4} alignItems="center">
                <Flex>
                    <Tooltip label="First Page">
                        <IconButton
                            onClick={() => gotoPage(0)}
                            isDisabled={!canPreviousPage}
                            icon={<ArrowLeftIcon h={3} w={3} />}
                            mr={4} />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            onClick={previousPage}
                            isDisabled={!canPreviousPage}
                            icon={<ChevronLeftIcon h={6} w={6} />} />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center">
                    <Text flexShrink="0" mr={8}>
                        Page{" "}
                        <Text fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                    </Text>
                    <Select
                        w={32}
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 15, 30, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Select>
                </Flex>

                <Flex>
                    <Tooltip label="Next Page">
                        <IconButton
                            onClick={nextPage}
                            isDisabled={!canNextPage}
                            icon={<ChevronRightIcon h={6} w={6} />} />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            onClick={() => gotoPage(pageCount - 1)}
                            isDisabled={!canNextPage}
                            icon={<ArrowRightIcon h={3} w={3} />}
                            ml={4} />
                    </Tooltip>
                </Flex>
            </Flex>
            <AlertDialog
                isOpen={removeItemConfirm.isConfirmOpen}
                leastDestructiveRef={cancelRef}
                onClose={onRemoveItemDialogClose}
                isCentered>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Remove Item
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure to remove this item?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onRemoveItemDialogClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={removeItemFromList} ml={3}>
                                Remove
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog></>
    )
}
export default UserCategoriesTable;