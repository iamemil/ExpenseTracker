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
    Text,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from '@chakra-ui/react';
import { React, useState, useRef } from 'react'
import { ArrowForwardIcon, DeleteIcon } from '@chakra-ui/icons'
import axios from "axios"
export default function NewReceiptForm({ receipt, receiptCallback }) {
    const [modifiedReceipt, setModifiedReceiptData] = useState(receipt);
    //const [isOpen, setIsOpen] = useState(false);
    const [removeItemConfirm, setRemoveItemConfirm] = useState({ isConfirmOpen: false, itemIndex: null });
    const onRemoveItemDialogClose = () => setRemoveItemConfirm({ isConfirmOpen: false, itemIndex: null });
    const cancelRef = useRef();

    function removeItemFromList() {
        let updatedReceiptItems = modifiedReceipt.receiptItems; // copying the old datas array
        updatedReceiptItems.splice(removeItemConfirm.itemIndex, 1); // remove the item from the array
        //setModifiedReceiptData()
        setModifiedReceiptData({
            ...receipt,
            receiptTotalSum: updatedReceiptItems.reduce((a, b) => parseFloat(a) + parseFloat(b.itemSum), 0).toFixed(2),
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
            receiptTotalSum: updatedReceiptItems.reduce((a, b) => parseFloat(a) + parseFloat(b.itemSum), 0).toFixed(2),
            receiptItems: updatedReceiptItems
        });
        receiptCallback(modifiedReceipt);
    }
//https://en66yiq4aanyija.m.pipedream.net
    const handleFormSubmit = event => {
        event.preventDefault();
        //console.log(modifiedReceipt);
        axios.post('https://httpbin.org/post', modifiedReceipt)
        .then(response => console.log(response.data.json));
        
    }
    return (
        <form onSubmit={handleFormSubmit}>
            <FormControl>
                <FormLabel htmlFor='storeName'>Store Name</FormLabel>
                <Input id='storeName' size='sm' value={modifiedReceipt.storeName} disabled={true} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='storeName'>Store Address</FormLabel>
                <Input id='storeName' size='sm' value={modifiedReceipt.storeAddress} disabled={true} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor='storeName'>Store Tax Number</FormLabel>
                <Input id='storeName' size='sm' value={modifiedReceipt.storeTaxNumber} disabled={true} />
            </FormControl>
            <Divider my={4} />
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Product Name</Th>
                        <Th isNumeric>Quantity</Th>
                        <Th isNumeric>Price</Th>
                        <Th isNumeric>Total</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {modifiedReceipt.receiptItems.map((element, index) =>
                        <Tr key={index}>
                            <Td>{element.itemName}</Td>
                            <Td isNumeric>
                                <NumberInput id='itemQuantity' size={'xs'} maxW={20} precision={3} min={0.1} step={0.1} defaultValue={element.itemQuantity} onChange={updateFieldChanged(index)}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Td>
                            <Td isNumeric>{element.itemPrice}</Td>
                            <Td isNumeric>{element.itemSum}</Td>
                            <Td>
                                <Button colorScheme='red' size={'sm'} variant='outline' onClick={() => setRemoveItemConfirm({ isConfirmOpen: true, itemIndex: index })}>
                                    <DeleteIcon />
                                </Button>
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <Text mt={4} align={'center'}>Total: {modifiedReceipt.receiptTotalSum}</Text>
            <Button colorScheme={'teal'} width={'100%'} mt={4} rightIcon={<ArrowForwardIcon />} type='submit'>Add Receipt</Button>

            <AlertDialog
                isOpen={removeItemConfirm.isConfirmOpen}
                leastDestructiveRef={cancelRef}
                onClose={onRemoveItemDialogClose}
            >
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