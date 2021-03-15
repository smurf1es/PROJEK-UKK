import { Avatar } from '@chakra-ui/avatar';
import { Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

const Sidebar = ({ content }) => {
  const filter = content && content.filter((it) => it.isAdmin === true);
  return (
    <div>
      <div>Daftar Petugas :</div>
      {filter &&
        filter.map((item) => (
          <>
            <Flex mt="2" alignItems="center">
              <Avatar name={item.username} />
              <Text ml="2" fontWeight="bold" fontSize="sm">
                {item.username}
              </Text>
            </Flex>
            <a href={`tel:${item.phoneNumber}`}>
              <Text mx="auto" fontSize="xs">
                Hubungi
              </Text>
            </a>
          </>
        ))}
    </div>
  );
};

export default Sidebar;
