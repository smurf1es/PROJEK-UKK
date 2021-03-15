import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/react';
import { Form } from 'react-bootstrap';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useEffect, useRef, useState } from 'react';
import AddReportBtn from './AddReportBtn';
import { useDispatch, useSelector } from 'react-redux';
import { createReport } from '../actions/reportActions';
import axios from 'axios';

export default function ReportModal() {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const reportCreate = useSelector((state) => state.reportCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = reportCreate;

  const reportList = useSelector((state) => state.reportList);
  const {
    loading: loadingList,
    success: successList,
    error: errorList,
  } = reportList;

  const initialRef = useRef();

  async function uploadImageHandler(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }

  async function submitHandler() {
    dispatch(createReport({ description, image }));
  }

  return (
    <>
      <AddReportBtn onOpen={onOpen} />
      <Modal
        closeOnEsc={true}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat laporan anda</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="description">
              <FormLabel>Deskripsi</FormLabel>
              <Input
                type="text"
                required={true}
                ref={initialRef}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="deskripsi..."
                value={description}
              />
            </FormControl>

            <FormControl mt="2" id="image">
              <FormLabel>Gambar</FormLabel>
              <Form.Control
                type="text"
                placeholder="url gambar..."
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
              <Form.File
                id="image-file"
                aria-label="Choose File"
                custom={true}
                onChange={uploadImageHandler}
              />
              {uploading && <Spinner size="sm" />}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={submitHandler} colorScheme="blue" mr={3}>
              Kirim
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
