import DetailTable from "../../components/Listing/DetailTable";
import TableFooter from "../../components/Listing/TableFooter";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { changeCountPerPage } from "./listingSlice";

const ListingDetailPage = () => {
  const baseURL = process.env.REACT_APP_API_URL + "getDetail";
  const tableHeaders = [
    "ID",
    "画像",
    "タイトル",
    "Ooo10 製品コード",
    "出品状態",
  ];

  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    dispatch(changeCountPerPage(15));
    //   {
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
