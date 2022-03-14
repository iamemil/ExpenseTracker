import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { React, useState, useCallback } from 'react'
import QrScanner from './QrScanner';
import ReceiptForm from './ReceiptForm';
export default function NewReceipt() {
  const receiptInitialState = {
    Id: "",
    storeName: "",
    storeAddress: "",
    companyName: "",
    companyTaxNumber: "",
    storeTaxNumber: "",
    receiptTotalSum: 0.00,
    receiptTimestamp : "",
    receiptItems: [],
    tagId : null,
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
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
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
                    <ReceiptForm receipt={receipt} receiptCallback={receiptCallback} />
                )
              }
            })()}
          </ModalBody>

          <ModalFooter>
              <Button variant={'outline'} width={'100%'} onClick={closeModal}>
                Close
              </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}