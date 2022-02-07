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
    Button
} from '@chakra-ui/react';
import { React, useState,useCallback} from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
export default function NewReceiptForm({ receipt,receiptCallback }) {
    const [modifiedReceipt, setModifiedReceiptData] = useState(receipt);
    const handleFormSubmit = event => {
        event.preventDefault();
        alert("Receipt saved!");
    }
    const updateFieldChanged = index => e => {
        let updatedReceiptItems = modifiedReceipt.receiptItems; // copying the old datas array
        updatedReceiptItems[index].itemQuantity = parseFloat(e||0); // replace e.target.value with whatever you want to change it to
        updatedReceiptItems[index].itemSum = parseFloat(updatedReceiptItems[index].itemQuantity * modifiedReceipt.receiptItems[index].itemPrice).toFixed(2);
        //console.log(modifiedReceipt); 
        setModifiedReceiptData({
            receiptItems: updatedReceiptItems
        });
        receiptCallback(modifiedReceipt);
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
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <Text mt={4} align={'center'}>Total: {modifiedReceipt.receiptTotalSum}</Text>
            <Button colorScheme={'teal'} width={'100%'} mt={4} rightIcon={<ArrowForwardIcon/>} type='submit'>Add Receipt</Button>

        </form>
    );
}