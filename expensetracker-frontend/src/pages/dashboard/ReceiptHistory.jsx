import React from "react";
import {
    Box,
    Text,
    Link,
    VStack,
    Grid,
    Table,
    Thead,
    Tbody,
    Tag,
    Tr,
    Th,
    Td,
    TableCaption,
    chakra
  } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
export default function ReceiptHistory() {
  const data = React.useMemo(
    () => [
      {
        merchantName: 'inches',
        categoryName: 'millimetres (mm)',
        spentAmount: 25.4,
      },
      {
        merchantName: 'feet',
        categoryName: 'centimetres (cm)',
        spentAmount: 30.48,
      },
      {
        merchantName: 'yards',
        categoryName: 'metres (m)',
        spentAmount: 0.91444,
      },
    ],
    [],
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Merchant',
        accessor: 'merchantName',
      },
      {
        Header: 'Category',
        accessor: 'categoryName',
      },
      {
        Header: 'Spent',
        accessor: 'spentAmount',
        isNumeric: true,
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='10px' width={'full'}>

    <Table {...getTableProps()} colorScheme={'gray'} boxShadow={'lg'}>
  <TableCaption placement={'top'} fontSize={'2xl'} textAlign={'left'}>Receipt History</TableCaption>
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