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
  } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import {React,Component} from 'react'
import QrReader from 'react-qr-reader'
import axios from "axios";

const receiptApiUrl = "https://monitoring.e-kassa.gov.az/pks-portal/1.0.0/documents/";
const receiptBaseUrl = "https://monitoring.e-kassa.gov.az/#/index?doc=";


class QrScanResult extends Component {

    state = {
      result: 'No result'
    }
    handleScan = data => {
      if (data && data.includes(receiptBaseUrl)) {
        this.setState({
          result: data
        })
        axios.get(receiptApiUrl + data.split(receiptBaseUrl)[1])
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          return error
        })
        .then(function () {
          // always executed
        });
      }
    }

    handleError = err => {
      console.error(err)
    }
    render() {
      if(this.state.result.includes(receiptBaseUrl)) return (<p>{this.state.result}</p>);
      return (
        <div>
          <QrReader
            delay={500}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p>{this.state.result}</p>
        </div>
      )
    }
  }

export default function NewReceipt() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
      <>
        <Button onClick={onOpen} colorScheme={'teal'} variant={'outline'} leftIcon={<AddIcon/>}>New Receipt</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Receipt</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <QrScanResult/>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }