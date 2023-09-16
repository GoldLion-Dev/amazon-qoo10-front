import ListTable from "../../components/Listing/ListTable";
import TableFooter from "../../components/Listing/TableFooter";
import Modal from "../../components/Listing/Modal";
import upload from "../../assets/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../utils/getUserId";
import axios from "axios";
import { useState, useEffect } from "react";
import { changeCountPerPage } from "./listingSlice";

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

  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [csvFileUpload, setCSVFileUpload] = useState();

  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  const baseURL = process.env.REACT_APP_API_URL + "getList";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeCountPerPage(15));
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
