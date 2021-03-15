import { Box } from '@chakra-ui/layout';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/tag';
import { AddIcon } from '@chakra-ui/icons';

export default function AddReportBtn({ onOpen, isDisabled }) {
  return (
    <Box my="4" as="button" onClick={onOpen} mx="auto" size="sm">
      <Tag size="lg" variant="subtle" colorScheme="cyan">
        <TagLeftIcon boxSize="12px" as={AddIcon} />
        <TagLabel>Buat Laporan</TagLabel>
      </Tag>
    </Box>
  );
}
