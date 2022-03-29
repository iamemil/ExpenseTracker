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
    Spacer,
    IconButton,
    Tooltip,
    Select,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
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
import StatisticsTable from './StatisticsTable';
import Chart from './Chart';
import UserCategoriesTable from './UserCategoriesTable';
function CategoryTab(props) {
    const rankingData = props.data == null ? [] : props.data;
    //const [data, setData] = useState([]);\

    return (
        <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} pt={6}>
            <Tabs variant='soft-rounded' colorScheme='teal'>
                <TabList pl={4}>
                    <Tab>Category Ranking</Tab>
                    <Tab>My Categories</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <StatisticsTable data={rankingData} />
                    </TabPanel>
                    <TabPanel>
                        <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} pt={6}>
                            <form>
                                <Flex justify={'start'} align={'end'} mx={6}>
                                    <Box mr={4}>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor='categoryName'>Category name</FormLabel>
                                            <Input id='categoryName' type='text' />
                                        </FormControl>
                                    </Box>
                                    <Box mr={4}>
                                        <Button colorScheme='teal' type='submit'>Add</Button>
                                    </Box>
                                </Flex>
                            </form>
                            <UserCategoriesTable />
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default CategoryTab;