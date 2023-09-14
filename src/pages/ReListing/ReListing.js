import ReListTable from "../../components/Listing/ReListTable";
import TableFooter from "../../components/Listing/TableFooter";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getUserId } from "../../utils/getUserId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

let filterTableData = [];
const api_root = process.env.REACT_APP_API_URL;
const ReListing = () => {
  const tableHeaders = [
    "ID",
    "画像",
    "タイトル",
    "価格",
    "在庫",
    "Qoo10 Code",
    "操作",
  ];

  const [tableData, setTableData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const activePage = useSelector((state) => state.listing.activePage);
  const isSuccess = useSelector((state) => state.relisting.isSuccess);
  const status = useSelector((state) => state.relisting.status);
  const [searchKeyword, setSearchKeyword] = useState("");
  let rowCount;
  let displayTableData = [];

  const baseURL = api_root + "getAllProducts";
  let itemArray = [];
  useEffect(() => {
    setLoading(true);
    axios
      .post(baseURL, {
        user_id: getUserId(),
      })
      .then((response) => {
        console.log(response["data"]["result"]);
        let result = response["data"]["result"]["listings"];
        result.map((listing) => {
          listing["listing_details"].map((item) => {
            if (item["list_status"] == 1) {
              itemArray.push(item);
            }
          });
        });
        setTableData(itemArray);
        setLoading(false);
      });
  }, [isSuccess]);

  useEffect(() => {
    if (status == "200") {
      toast.success("success");
    }
  }, [isSuccess]);

  const handleChangeInput = (event) => {
    const productTitle = event.target.value;
    setSearchKeyword(productTitle);
    filterTableData = tableData.filter((data) => {
      const title = data.title;
      return title.includes(productTitle);
    });

    displayTableData = filterTableData;
  };
  if (searchKeyword == "") {
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
    rowCount = tableData.length;
  } else {
    if (countPerPage * activePage <= filterTableData.length) {
      displayTableData = filterTableData.slice(
        countPerPage * (activePage - 1),
        countPerPage * activePage
      );
    } else {
      displayTableData = filterTableData.slice(
        countPerPage * (activePage - 1),
        filterTableData.length
      );
    }
    rowCount = displayTableData.length;
  }

  return (
    <>
      <div class="container mb-3">
        <div class="relative mb-3 mt-2 flex h-12 sm:w-[20%] md:w-[20%] w-full float-right">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="商品タイトルを入力してください"
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <ReListTable
        tableHeaders={tableHeaders}
        tableData={displayTableData}
        isLoading={isLoading}
      />
      <TableFooter rowCount={rowCount} />
      <ToastContainer />
    </>
  );
};

export default ReListing;
