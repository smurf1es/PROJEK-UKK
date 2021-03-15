import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/tag';
import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommentReport } from '../actions/reportActions';

export default function CommentModal({ reportId }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const [text, setText] = useState('');

  async function submitHandler() {
    dispatch(createCommentReport({ _id: reportId, text }));
  }

  return (
    <Fragment>
      <Box my="4" as="button" onClick={onOpen} mx="auto" size="sm">
        <Tag size="lg" variant="subtle" colorScheme="cyan">
          <TagLeftIcon boxSize="12px" as={AddIcon} />
          <TagLabel>Tambahkan Komentar</TagLabel>
        </Tag>
      </Box>
      <Modal
        closeOnEsc={true}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat komentar</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Deskripsi</FormLabel>
              <Input
                type="text"
                ref={initialRef}
                onChange={(e) => setText(e.target.value)}
                placeholder="teks..."
                value={text}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={submitHandler} colorScheme="blue" mr={3}>
              Buat Komentar
            </Button>
            <Button onClick={onClose}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
