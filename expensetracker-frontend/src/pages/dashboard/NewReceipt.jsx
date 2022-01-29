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
import {Component} from 'react'
import QrReader from 'react-qr-reader'
class QrScanner extends Component {
    state = {
      result: 'No result'
    }
  
    handleScan = data => {
      if (data && data.includes('https://monitoring.e-kassa.gov.az/#/index?doc=')) {
        this.setState({
          result: data
        })
      }
    }
    handleError = err => {
      console.error(err)
    }
    render() {
      return (
        <div>
          <QrReader
            delay={300}
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
              <QrScanner/>
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