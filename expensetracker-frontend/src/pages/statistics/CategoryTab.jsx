import React from 'react'
import {
    Box,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Tabs,
    TabList,
    TabPanels,
    Tab, TabPanel,
    Button
} from '@chakra-ui/react';
import StatisticsTable from './StatisticsTable';
import { useRef,useState,useCallback } from 'react';
import UserCategoriesTable from './UserCategoriesTable';
import StoreTagService from '../../api/StoreTagService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function CategoryTab(props) {
    const rankingData = props.data == null ? [] : props.data;
    let storeTagService = new StoreTagService();

    const [existingTag, setExistingTagId] = useState();
    const existingTagCallback = useCallback((existingTag) => {
        setExistingTagId(existingTag);
        tagNameRef.current.value=existingTag.Name;
    }, []);
    const tagNameRef = useRef();
    const MySwal = withReactContent(Swal);

    const handleFormSubmit = event => {
        event.preventDefault();
        const existingTagId = existingTag.Id;
        const tagName = tagNameRef.current.value;
        if(existingTagId===''){
            storeTagService.createStoreTag(tagName)
            .then((response) => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#319795'
                    });
                } else {
                    MySwal.fire({
                        title: 'Warning',
                        text: response.data.message,
                        icon: 'warning',
                        confirmButtonColor: '#319795'
                    });
                }
            })
            .catch((error) => {
                MySwal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: '#319795'
                });
            }
            );
        }else{
            storeTagService.editStoreTag(existingTagId,tagName)
            .then((response) => {
                if (response.data.status === 200) {
                    MySwal.fire({
                        title: 'Success',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonColor: '#319795'
                    });
                } else {
                    MySwal.fire({
                        title: 'Warning',
                        text: response.data.message,
                        icon: 'warning',
                        confirmButtonColor: '#319795'
                    });
                }
            })
            .catch((error) => {
                MySwal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                    confirmButtonColor: '#319795'
                });
            }
            );
        }


    }
    return (
        <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} pt={6}>
            <Tabs variant='soft-rounded' colorScheme='teal'>
                <Center>
                <TabList>
                    <Tab>Category Ranking</Tab>
                    <Tab>My Categories</Tab>
                </TabList>
                </Center>
                <TabPanels>
                    <TabPanel>
                        <StatisticsTable data={rankingData} />
                    </TabPanel>
                    <TabPanel>
                        <Box fontSize="l" border='1px' borderColor='gray.100' borderRadius='15px' width={'full'} boxShadow={'xl'} pt={6}>
                            <form onSubmit={handleFormSubmit}>
                                <Flex justify={'start'} align={'end'} mx={6}>
                                    <Box mr={4}>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor='categoryName'>Category name</FormLabel>
                                            <Input id='categoryName' type='text' ref={tagNameRef} />
                                        </FormControl>
                                    </Box>
                                    <Box mr={4}>
                                        <Button mr={4} colorScheme='teal' type='submit'>
                                            Add/Update
                                        </Button>
                                        <Button colorScheme='gray' onClick={() => existingTagCallback({Id:null,Name:null})}>Clear</Button>
                                    </Box>
                                </Flex>
                            </form>
                            <UserCategoriesTable existingTagCallback={existingTagCallback} />
                        </Box>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
export default CategoryTab;