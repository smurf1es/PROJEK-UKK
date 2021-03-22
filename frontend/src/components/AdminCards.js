import * as Chakra from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import AssistantIcon from '@material-ui/icons/Assistant';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function AdminCards() {
  const reportList = useSelector((state) => state.reportList);
  const { reports } = reportList;

  const verifiedReports = reports.filter((report) => report.reportStatus === 1);
  const doneReports = reports.filter((report) => report.reportStatus === 2);

  return (
    <Chakra.Flex alignItems="center" justifyContent="center" my="12">
      <Chakra.Box border="1px" borderRadius="md">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="red"
                  textTransform="capitalize"
                >
                  <Chakra.StatLabel>Total Laporan</Chakra.StatLabel>
                </Chakra.Badge>
                <Chakra.Box>
                  <AssignmentReturnedIcon />
                </Chakra.Box>
              </Chakra.Flex>
              <Chakra.StatNumber>
                {!isEmpty(reports) ? (
                  reports.length
                ) : (
                  <Chakra.Spinner size="sm" />
                )}
              </Chakra.StatNumber>
              <Chakra.StatHelpText textAlign="right">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>

      <Chakra.Box mx="4" border="1px" borderRadius="md">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="telegram"
                  textTransform="capitalize"
                >
                  <Chakra.StatLabel>Laporan Terverifikasi</Chakra.StatLabel>
                </Chakra.Badge>
                <Chakra.Box>
                  <AssistantIcon />
                </Chakra.Box>
              </Chakra.Flex>
              <Chakra.StatNumber>
                {!isEmpty(reports) ? (
                  verifiedReports.length
                ) : (
                  <Chakra.Spinner size="sm" />
                )}
              </Chakra.StatNumber>
              <Chakra.StatHelpText textAlign="right">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>

      <Chakra.Box border="1px" borderRadius="md">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="green"
                  textTransform="capitalize"
                >
                  <Chakra.StatLabel>Laporan Selesai</Chakra.StatLabel>
                </Chakra.Badge>
                <Chakra.Box>
                  <AssignmentTurnedInIcon />
                </Chakra.Box>
              </Chakra.Flex>
              <Chakra.StatNumber>
                {!isEmpty(reports) ? (
                  doneReports.length
                ) : (
                  <Chakra.Spinner size="sm" />
                )}
              </Chakra.StatNumber>
              <Chakra.StatHelpText textAlign="right">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </Chakra.Box>
    </Chakra.Flex>
  );
}
