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
  Input
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { React, useState, useCallback } from 'react'
import QrScanner from './QrScanner';
export default function NewReceipt() {
  const receiptInitialState = {
    Id: "", 
    storeName: "", 
    storeAddress: "", 
    companyName: "", 
    companyTaxNumber: "", 
    storeTaxNumber: "" 
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [receipt, setReceiptData] = useState(receiptInitialState);

  const receiptCallback = useCallback((receipt) => {
    setReceiptData(receipt);
  }, []);

  function closeModal(){
    setReceiptData(receiptInitialState);
    onClose();
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme={'teal'} variant={'outline'} leftIcon={<AddIcon />}>New Receipt</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Receipt</ModalHeader>
          <ModalCloseButton onClick={closeModal}/>
          <ModalBody>
            {(() => {
              if(receipt.Id === ""){
                return (<QrScanner receiptCallback={receiptCallback} />)
              }else{
                return (
                  <div>
                  <FormControl>
                  <FormLabel htmlFor='storeName'>Store Name</FormLabel>
                  <Input id='storeName' size='sm' value={receipt.storeName} disabled={true}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='storeName'>Store Address</FormLabel>
                  <Input id='storeName' size='sm' value={receipt.storeAddress} disabled={true}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='storeName'>Store Tax Number</FormLabel>
                  <Input id='storeName' size='sm' value={receipt.storeTaxNumber} disabled={true}/>
                </FormControl>
                </div>
                )
              }
            })()}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeModal}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}