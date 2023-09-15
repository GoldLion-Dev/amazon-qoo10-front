import ListTable from "../../components/Listing/ListTable";
import TableFooter from "../../components/Listing/TableFooter";
import Modal from "../../components/Listing/Modal";
import upload from "../../assets/upload.png";
import { useSelector } from "react-redux";
import { getUserId } from "../../utils/getUserId";
import axios from "axios";
import { useState, useEffect } from "react";

const Listing = () => {
  const tableHeaders = [
    "ID",
    "時刻",
    "状態",
    "インポート名",
    "入力件数",
    "出品結果",
    "操作",
  ];

  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "A",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "2",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "B",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "3",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "4",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "5",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "6",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "7",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "8",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "9",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "10",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "11",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "12",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "13",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "14",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "15",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "16",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "17",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "A",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "18",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "B",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "19",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "20",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "21",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "22",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "23",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "24",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "25",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "26",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "27",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "28",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "29",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "30",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "31",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "32",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "33",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "34",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "35",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "36",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "37",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "38",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "39",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "40",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "41",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "42",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "43",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  //   {
  //     id: "44",
  //     dateTime: "1 Year",
  //     status: "listed",
  //     importName: "C",
  //     count: "10",
  //     listedCount: "5",
  //   },
  // ];
  // let tableData = [];
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [csvFileUpload, setCSVFileUpload] = useState();

  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  const baseURL = process.env.REACT_APP_API_URL + "getList";
  useEffect(() => {
    setLoading(true);
    axios
      .post(baseURL, {
        user_id: getUserId(),
      })
      .then((response) => {
        console.log(response["data"]["result"]);
        let result = response["data"]["result"];
        setTableData(result);
        setLoading(false);
      });
  }, [csvFileUpload, isProcessing]);
  let displayTableData = [];
  if (countPerPage * activePage <= tableData.length) {
    displayTableData = tableData.slice(
      countPerPage * (activePage - 1),
      countPerPage * activePage
    );
  } else {
    displayTableData = tableData.slice(
      countPerPage * (activePage - 1),
      tableData.length
    );
  }
  return (
    <>
      <div className="container pt-5 ">
        <Modal handleUpload={setCSVFileUpload} />
      </div>

      <ListTable
        tableHeaders={tableHeaders}
        tableData={displayTableData}
        isLoading={isLoading}
      />
      <TableFooter rowCount={tableData.length} />
    </>
  );
};

export default Listing;
