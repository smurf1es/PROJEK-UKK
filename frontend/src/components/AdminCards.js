import * as Chakra from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import moment from 'moment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssistantIcon from '@material-ui/icons/Assistant';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Tooltip } from '@material-ui/core';

export default function AdminCards() {
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  const verifiedReports = reports.filter((report) => report.reportStatus === 1);
  const doneReports = reports.filter((report) => report.reportStatus === 2);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="w-25 rounded border">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="gray"
                  textTransform="capitalize"
                >
                  <Tooltip title="Klik untuk mendapatkan data">
                    <Chakra.StatLabel>Total Laporan</Chakra.StatLabel>
                  </Tooltip>
                </Chakra.Badge>
                <Chakra.Box>
                  <AssignmentLateIcon />
                </Chakra.Box>
              </Chakra.Flex>
              <Chakra.StatNumber>
                {!isEmpty(reports) ? (
                  reports.length
                ) : (
                  <Chakra.Spinner size="sm" />
                )}
              </Chakra.StatNumber>
              <Chakra.StatHelpText display="inline-flex">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </div>

      <div className="w-25 rounded border mx-5">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="telegram"
                  textTransform="capitalize"
                >
                  <Tooltip title="Klik untuk mendapatkan data">
                    <Chakra.StatLabel>Laporan Terverifikasi</Chakra.StatLabel>
                  </Tooltip>
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
              <Chakra.StatHelpText display="inline-flex">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </div>

      <div className="w-25 rounded border">
        <Chakra.Box p="6">
          <Chakra.Box d="flex" alignItems="baseline">
            <Chakra.Stat>
              <Chakra.Flex alignItems="center">
                <Chakra.Badge
                  mr="2"
                  colorScheme="green"
                  textTransform="capitalize"
                >
                  <Tooltip title="Klik untuk mendapatkan data">
                    <Chakra.StatLabel>Laporan Selesai</Chakra.StatLabel>
                  </Tooltip>
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
              <Chakra.StatHelpText display="inline-flex">
                <Chakra.Text mr="1">Terakhir dihitung otomatis</Chakra.Text>
                <Chakra.Text fontWeight="bold">
                  {moment(Date.now()).format('DD MMM')}
                </Chakra.Text>
              </Chakra.StatHelpText>
            </Chakra.Stat>
          </Chakra.Box>
        </Chakra.Box>
      </div>
    </div>
  );
}
