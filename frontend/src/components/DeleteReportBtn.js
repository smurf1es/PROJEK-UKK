import { Box } from '@chakra-ui/layout';
import { DeleteIcon } from '@chakra-ui/icons';

export default function DeleteReportBtn({ onClick }) {
  return (
    <Box as="button" onClick={onClick} fontSize="sm">
      <DeleteIcon />
    </Box>
  );
}
