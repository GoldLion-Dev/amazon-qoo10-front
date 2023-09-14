import DetailTable from "../../components/Listing/DetailTable";
import TableFooter from "../../components/Listing/TableFooter";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const ListingDetailPage = () => {
  const baseURL = process.env.REACT_APP_API_URL + "getDetail";
  const tableHeaders = ["ID", "画像", "タイトル", "Ooo10 ItemCode", "出品状態"];

  //   {
  //     id: "1",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "A",
  //   },
  //   {
  //     id: "2",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "B",
  //   },
  //   {
  //     id: "3",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "C",
  //   },
  //   {
  //     id: "4",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "D",
  //   },
  //   {
  //     id: "5",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "E",
  //   },
  //   {
  //     id: "6",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "F",
  //   },
  //   {
  //     id: "7",
  //     dateTime: "1 Year",
  //     status: "waiting",
  //     importName: "G",
  //   },
  // ];
  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .post(baseURL, {
        listing_id: id,
      })
      .then((response) => {
        console.log(response["data"]["result"]);
        let result = response["data"]["result"];
        setTableData(result);
        setLoading(false);
      });
  }, []);
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
      <div className="mt-10"></div>

      <DetailTable
        tableHeaders={tableHeaders}
        tableData={displayTableData}
        isLoading={isLoading}
      />
      <TableFooter rowCount={tableData.length} />
    </>
  );
};

export default ListingDetailPage;
