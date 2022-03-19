import React from 'react'
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Center,
    Tr,
    Th,
    Td,
    chakra,
    Flex,
    IconButton,
    Tooltip,
    Select,
    Tabs,
    TabList,
    TabPanels,
    Tab, TabPanel,
    Checkbox,
    Button
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter, useAsyncDebounce, useRowSelect } from 'react-table'
import ItemService from '../../api/ItemService';
import StatisticsService from '../../api/StatisticsService';
import Chart from './Chart';
function StatisticsTab(props) {
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartDataLoading, setChartDataLoading] = useState(false);
    useEffect(() => {
        let itemService = new ItemService();
        itemService.getUserReceiptItems()
            .then((response) => {
                const data = response.data.userReceiptItems.map(item =>
                ({
                    Name: item.Name,
                    storeName: item.storeName,
                    storeId: item.StoreId,
                    itemStoreCode: item.ItemStoreCode
                })
                )
                setData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Define a default UI for filtering
    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
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
                    placeholder={`${data.length} items...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </span>
        )
    }

    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef
            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])
            return (
                <>
                    <Checkbox ref={resolvedRef} {...rest} colorScheme={'teal'} />
                </>
            )
        }
    )
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'Name',
                Cell: (props) => {
                    return (
                        <Box fontWeight={"bold"}>
                            {props.cell.value} <br /> <Text fontSize={'xs'} fontWeight={"normal"}>{props.row.values.storeName}</Text>
                        </Box>
                    );
                },
            },
            {
                Header: 'Store',
                accessor: 'storeName',
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
        state: { pageIndex, pageSize, selectedRowIds },
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        selectedFlatRows }
        = useTable(
            {
                columns,
                data,
                initialState: { pageIndex: 0, pageSize: 5, hiddenColumns: ['storeName'] },
            },
            useFilters,
            useGlobalFilter,
            useSortBy,
            usePagination,
            useRowSelect,
            hooks => {
                hooks.visibleColumns.push(columns => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: () => (
                            <Checkbox colorScheme={'teal'} isChecked={true} isDisabled={true} />
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <Box>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </Box>
                        ),
                    },
                    ...columns,
                ])
            })
    const tempArrayInitial = new Set();
    const [tempArray, setTempArray] = useState(tempArrayInitial);


    function updateChartData() {
        if (selectedFlatRows.length > 0) {
            let statisticsService = new StatisticsService();
            for (let i = 0; i < selectedFlatRows.length; i++) {
                //console.log(selectedFlatRows[i]);
                statisticsService.getItemStatistics(selectedFlatRows[i].original.storeId, selectedFlatRows[i].original.itemStoreCode)
                    .then((response) => {
                        if (response.data.status == 200) {
                            if(!tempArray.has(response.data)){
                                setTempArray(prevState => new Set(prevState).add(response.data));
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }else{
            setTempArray(tempArrayInitial);
            setChartData(tempArrayInitial);
        }
        setChartData(tempArray);
        setTempArray(tempArrayInitial);
    }
    if (data.length === 0) {
        return (
            <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'}>
                <Table {...getTableProps()}
                    colorScheme={'gray'}
                    fontSize={'sm'}>
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
                <Center>Not enough data to show</Center>
            </Box>
        );
    }
    return (
        <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} pt={6}>
            <Tabs variant='soft-rounded' colorScheme='teal'>
                <TabList pl={6}>
                    <Tab>Items</Tab>
                    <Tab>Price Chart</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Button colorScheme='teal' variant='outline' onClick={() => { updateChartData() }}>Get Info</Button>
                        <Table {...getTableProps()}
                            colorScheme={'gray'}
                            fontSize={'sm'}>
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
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <Tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => (
                                                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                                    {cell.render('Cell')}
                                                </Td>
                                            ))}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                        <Flex justifyContent="space-between" m={4} alignItems="center">
                            <Flex>
                                <Tooltip label="First Page">
                                    <IconButton
                                        onClick={() => gotoPage(0)}
                                        isDisabled={!canPreviousPage}
                                        icon={<ArrowLeftIcon h={3} w={3} />}
                                        mr={4}
                                    />
                                </Tooltip>
                                <Tooltip label="Previous Page">
                                    <IconButton
                                        onClick={previousPage}
                                        isDisabled={!canPreviousPage}
                                        icon={<ChevronLeftIcon h={6} w={6} />}
                                    />
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
                                        icon={<ChevronRightIcon h={6} w={6} />}
                                    />
                                </Tooltip>
                                <Tooltip label="Last Page">
                                    <IconButton
                                        onClick={() => gotoPage(pageCount - 1)}
                                        isDisabled={!canNextPage}
                                        icon={<ArrowRightIcon h={3} w={3} />}
                                        ml={4}
                                    />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Chart data={chartData} datepickerEnabled={false} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default StatisticsTab;