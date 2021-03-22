import { useSelector } from 'react-redux';
import * as Chakra from '@chakra-ui/react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { table } from '../middleware/tableMiddleware';
import AdminCards from '../components/AdminCards';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const GenerateReportPage = ({ history }) => {
  const formatDate = moment(Date.now()).format('DD MMM YYYY');
  const reportList = useSelector((state) => state.reportList);
  const { loading, error, reports } = reportList;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUserInfo, userInfo } = userLogin;

  useEffect(() => {
    if (!loadingUserInfo && !userInfo) history.push('/login');
  }, [loadingUserInfo, history, userInfo]);

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    info: {
      title: `Laporan_${formatDate}`,
      author: 'Lapor.in',
      subject: 'Laporan masyarakat yang ter-generate dari Lapor.in:',
    },
    content: [
      { text: 'Laporan Masyarakat', style: 'header' },
      {
        text:
          'Berikut adalah summary laporan yang diambil dari aplikasi Lapor.in',
        margin: [0, 0, 0, 20],
      },
      table(
        reports,
        ['username', 'description', 'exactCreatedDate', 'reportStatus'],
        [100, 150, 130, 100],
        true,
        [
          {
            text: 'Username',
            bold: true,
            alignment: 'center',
            alignmentChild: 'center',
          },
          {
            text: 'Deskripsi',
            bold: true,
            alignment: 'center',
          },
          {
            text: 'Tanggal Lapor',
            bold: true,
            alignment: 'center',
            alignmentChild: 'center',
          },
          {
            text: 'Status Laporan',
            bold: true,
            alignment: 'center',
            alignmentChild: 'center',
          },
        ]
      ),
      {
        margin: [0, 10, 0, 0],
        text: 'Keterangan :',
        bold: true,
      },
      {
        margin: [0, 10, 0, 0],
        columns: [
          {
            width: 25,
            text: '0 =',
          },
          {
            width: 100,
            text: 'Belum terverifikasi',
          },
        ],
      },
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            width: 25,
            text: '1 =',
          },
          {
            width: 100,
            text: 'Telah terverifikasi',
          },
        ],
      },
      {
        margin: [0, 5, 0, 0],
        columns: [
          {
            width: 25,
            text: '2 =',
          },
          {
            width: 100,
            text: 'Selesai',
          },
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center',
      },
    },
  };
  const generateDoc = pdfMake.createPdf(docDefinition);

  return (
    <Chakra.Container maxW="container.md">
      <AdminCards />

      <Chakra.Box
        justifyContent="flex-start"
        mt="12"
        alignItems="center"
        display="flex"
      >
        <Chakra.Box>
          <Chakra.Text fontWeight="bold">Aksi :</Chakra.Text>
        </Chakra.Box>
        <Chakra.Flex ml="4" alignItems="center">
          <Chakra.Box mr="2">
            <Chakra.Button
              color="facebook.500"
              variant="link"
              onClick={() => generateDoc.open()}
            >
              Preview
            </Chakra.Button>
          </Chakra.Box>

          <Chakra.Box>
            <Chakra.Button
              onClick={() => generateDoc.download(`Laporan_${formatDate}`)}
              colorScheme="facebook"
            >
              Download
            </Chakra.Button>
          </Chakra.Box>
        </Chakra.Flex>
      </Chakra.Box>
    </Chakra.Container>
  );
};

export default GenerateReportPage;
