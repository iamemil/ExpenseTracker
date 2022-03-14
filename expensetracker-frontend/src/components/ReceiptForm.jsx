import {
    FormControl,
    FormLabel,
    Input,
    Divider,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Select,
    Flex,
    Spacer,
    Tag
} from '@chakra-ui/react';
import { React, useState, useRef, useEffect } from 'react'
import { RepeatIcon, DeleteIcon, CalendarIcon,AddIcon } from '@chakra-ui/icons'
import axios from "axios"
import StoreTagService from '../api/StoreTagService';
import ReceiptService from "../api/ReceiptService";
export default function ReceiptForm({ receipt, receiptCallback }) {
    const [modifiedReceipt, setModifiedReceiptData] = useState(receipt);
    const [receiptCategories, setReceiptCategories] = useState([]);
    //const [isOpen, setIsOpen] = useState(false);
    const [removeItemConfirm, setRemoveItemConfirm] = useState({ isConfirmOpen: false, itemIndex: null });
    const onRemoveItemDialogClose = () => setRemoveItemConfirm({ isConfirmOpen: false, itemIndex: null });
    const cancelRef = useRef();
    useEffect(() => {
        let storeTagService = new StoreTagService();
        storeTagService.getStoreTags(true)
        .then((response) => {
            setReceiptCategories(response.data.data);
        })
        .catch((error) => {
            console.log(error);
        });
     },[]);
     
    function removeItemFromList() {
        let updatedReceiptItems = modifiedReceipt.receiptItems; // copying the old datas array
        updatedReceiptItems.splice(removeItemConfirm.itemIndex, 1); // remove the item from the array
        //setModifiedReceiptData()
        setModifiedReceiptData({
            ...receipt,
            receiptTotalSum: parseFloat(updatedReceiptItems.reduce((a, b) => parseFloat(a) + parseFloat(b.itemSum), 0)).toFixed(2),
            receiptItems: updatedReceiptItems
        });
        receiptCallback(modifiedReceipt);
        onRemoveItemDialogClose();
    }

    const updateFieldChanged = index => e => {
        let updatedReceiptItems = modifiedReceipt.receiptItems; // copying the old datas array
        updatedReceiptItems[index].itemQuantity = parseFloat(e || 0); // replace e.target.value with whatever you want to change it to
        updatedReceiptItems[index].itemSum = parseFloat(updatedReceiptItems[index].itemQuantity * modifiedReceipt.receiptItems[index].itemPrice).toFixed(2);
        setModifiedReceiptData({
            ...receipt,
            receiptTotalSum: parseFloat(updatedReceiptItems.reduce((a, b) => parseFloat(a) + parseFloat(b.itemSum), 0)).toFixed(2),
            receiptItems: updatedReceiptItems
        });
        receiptCallback(modifiedReceipt);
    }

    const updateCategoryChanged = (event) => {
        const tag = event.target.value
        setModifiedReceiptData({
            ...receipt,
            tagId : parseInt(tag)
        });
        receiptCallback(modifiedReceipt);
    }
    //https://en66yiq4aanyija.m.pipedream.net
    const handleFormSubmit = event => {
        event.preventDefault();
        //console.log(modifiedReceipt);
        const formData = new FormData();
        formData.append("Id", modifiedReceipt.Id);
        formData.append("storeName", modifiedReceipt.storeName); 
        formData.append("storeAddress", modifiedReceipt.storeAddress);
        formData.append("storeTaxNumber", modifiedReceipt.storeTaxNumber);
        formData.append("companyName", modifiedReceipt.companyName);
        formData.append("companyTaxNumber", modifiedReceipt.companyTaxNumber); 
        formData.append("receiptTotalSum", modifiedReceipt.receiptTotalSum);
        formData.append("receiptTimestamp", modifiedReceipt.receiptTimestamp);
        //modifiedReceipt.receiptItems.forEach(item => formData.append("receiptItems", JSON.stringify(item)));
        formData.append("receiptItems", JSON.stringify(modifiedReceipt.receiptItems)); 
        formData.append("existing", modifiedReceipt.existing);
        formData.append("tagId", modifiedReceipt.tagId);
        let receiptService = new ReceiptService();
        receiptService
        .create(formData)
        .then(response => console.log(response.data));

    }
    return (
        <form onSubmit={handleFormSubmit}>
            <FormControl>
                <FormLabel htmlFor='merchantName'>Merchant Name</FormLabel>
                <Input id='merchantName' size='sm' value={modifiedReceipt.storeName} disabled={true} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='merchantAddress'>Merchant Address</FormLabel>
                <Input id='merchantAddress' size='sm' value={modifiedReceipt.storeAddress} disabled={true} />
            </FormControl>
            <Flex>
                <FormControl>
                    <FormLabel htmlFor='merchantTaxNumber'>Merchant Tax Number</FormLabel>
                    <Input id='merchantTaxNumber' size='sm' value={modifiedReceipt.storeTaxNumber} disabled={true} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel htmlFor='merchantCategory'>Merchant Category</FormLabel>
                    <Select id='merchantCategory' placeholder='Choose Category' size='sm' onChange={updateCategoryChanged}>
                        {receiptCategories.map((category) => <option value={category.Id}>{category.Name}</option>)}
                    </Select>
                </FormControl>
            </Flex>
            <Divider my={4} />
            <Table size='xs'>
                <Thead>
                    <Tr>
                        <Th>Product Name</Th>
                        <Th>Quantity</Th>
                        <Th>Price</Th>
                        <Th>Total</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody fontSize={'sm'}>
                    {modifiedReceipt.receiptItems.map((element, index) =>
                        <Tr key={index}>
                            <Td>{element.itemName}</Td>
                            <Td>
                                <NumberInput id='itemQuantity' size={'xs'} maxW={20} precision={3} min={0.1} step={0.1} defaultValue={element.itemQuantity} onChange={updateFieldChanged(index)}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Td>
                            <Td>{element.itemPrice}</Td>
                            <Td>{element.itemSum} ₼</Td>
                            <Td>
                                <Button colorScheme='red' size={'sm'} variant='outline' onClick={() => setRemoveItemConfirm({ isConfirmOpen: true, itemIndex: index })}>
                                    <DeleteIcon />
                                </Button>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <Flex fontSize={'sm'} mt={4}>
                <Tag colorScheme='teal'>Total: {modifiedReceipt.receiptTotalSum} ₼</Tag>
                <Spacer />
                <Tag colorScheme='teal'><CalendarIcon color={'black.600'} mr={2} />{modifiedReceipt.receiptTimestamp}</Tag>
            </Flex>
            {(() => {
                if(modifiedReceipt.existing){
                    return (
                    <Button colorScheme={'teal'} width={'100%'} mt={4} leftIcon={<RepeatIcon />} type='submit'>Update Receipt</Button>
                    );
                }else{
                    return (
                        <Button colorScheme={'teal'} width={'100%'} mt={4} leftIcon={<AddIcon />} type='submit'>Add Receipt</Button>
                        );
                }
            })()}

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
            </AlertDialog>
        </form>
    );
}