import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
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
  ButtonGroup
} from '@chakra-ui/react';
import { AddIcon,ArrowForwardIcon } from '@chakra-ui/icons'
import { React, useState, useCallback } from 'react'
import QrScanner from './QrScanner';
export default function NewReceipt() {
  const receiptInitialState = {
    Id: "",
    storeName: "",
    storeAddress: "",
    companyName: "",
    companyTaxNumber: "",
    storeTaxNumber: "",
    receiptTotalSum: 0.00,
    receiptItems: []
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [receipt, setReceiptData] = useState(receiptInitialState);

  const receiptCallback = useCallback((receipt) => {
    setReceiptData(receipt);
  }, []);

  function closeModal() {
    setReceiptData(receiptInitialState);
    onClose();
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme={'teal'} variant={'outline'} leftIcon={<AddIcon />}>New Receipt</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Receipt</ModalHeader>
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            {(() => {
              if (receipt.Id === "") {
                return (<QrScanner receiptCallback={receiptCallback} receiptInitialState={receiptInitialState} />)
              } else {
                return (
                  <div>
                    <FormControl>
                      <FormLabel htmlFor='storeName'>Store Name</FormLabel>
                      <Input id='storeName' size='sm' value={receipt.storeName} disabled={true} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='storeName'>Store Address</FormLabel>
                      <Input id='storeName' size='sm' value={receipt.storeAddress} disabled={true} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='storeName'>Store Tax Number</FormLabel>
                      <Input id='storeName' size='sm' value={receipt.storeTaxNumber} disabled={true} />
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
                        {receipt.receiptItems.map((element, index) =>
                          <Tr id={index}>
                            <Td>{element.itemName}</Td>
                            <Td isNumeric>
                              <NumberInput id='productQuantity' size={'xs'} maxW={20} precision={3} step={0.1} defaultValue={element.itemQuantity}>
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
                    <Text align={'center'}>Total: {receipt.receiptTotalSum}</Text>
                  </div>
                )
              }
            })()}
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button variant={'outline'} alignSelf={'left'} mr={3} onClick={closeModal}>
                Close
              </Button>
              <Button colorScheme={'teal'} rightIcon={<ArrowForwardIcon/>}>Add Receipt</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}