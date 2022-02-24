import React from "react";
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
    HStack
  } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import NewReceipt from './NewReceipt'

export default function ReceiptHistory() {
  
  const data = React.useMemo(
    () => [
      {
        merchantName: 'Starbucks',
        categoryName: 'Food&Drink',
        timestamp: '10:45, 01.01.2022',
        spentAmount: 25.4,
      },
      {
        merchantName: 'Bravo Supermarket',
        categoryName: 'Shopping',
        timestamp: '11:30, 02.01.2022',
        spentAmount: 40.48,
      },
      {
        merchantName: 'Wolt',
        categoryName: 'Food&Drink',
        timestamp: '16:00, 03.01.2022',
        spentAmount: 9.14,
      },
      {
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
            <Text fontWeight={"bold"}>
              {props.cell.value} <br/> <Text fontSize={'xs'} fontWeight={"normal"}>{props.row.values.timestamp}</Text>
            </Text>
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
    useTable({ columns, data, initialState}, useSortBy )

  return (
    <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'}>
    <Table {...getTableProps()} colorScheme={'gray'} fontSize={'sm'}>
        <TableCaption placement={'top'} fontSize={'2xl'}>
        <HStack justifyContent={'space-between'}>
          <Text>Receipt History</Text>
         <NewReceipt/>
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
            <Tr {...row.getRowProps()}>
              
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
    </Box>
  )
}