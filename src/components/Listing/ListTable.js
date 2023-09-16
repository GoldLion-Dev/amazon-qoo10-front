import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  resetPagnation,
  setProcessing,
} from "../../pages/Listing/listingSlice";
import Loader from "./Loader";
import { getUserId } from "../../utils/getUserId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListTable = ({ tableHeaders, tableData, isLoading }) => {
  const listURL = process.env.REACT_APP_API_URL + "listProduct";
  const isProcessing = useSelector((state) => state.listing.isProcessing);
  const currentPage = useSelector((state) => state.listing.activePage);
  const countPerPage = useSelector((state) => state.listing.countPerPage);
  const dispatch = useDispatch();
  const handleResetPagnation = () => {
    dispatch(resetPagnation());
  };

  const handleListButton = (event) => {
    dispatch(setProcessing(true));
    axios
      .post(listURL, { id: event.target.id, userId: getUserId() })
      .then((response) => {
        console.log(response["data"]["status"]);
        if (response["data"]["status"] == "200") {
          dispatch(setProcessing(false));
          toast.success(response["data"]["message"]);
        }
        if (response["data"]["status"] == "300") {
          dispatch(setProcessing(false));
          toast.warn(response["data"]["message"]);
        }
        if (response["data"]["status"] == "500") {
          dispatch(setProcessing(false));
          toast.error(response["data"]["message"]);
        }
      });
  };

  const handleDeleteList = (event) => {
    const list_id = event.target.id;
    const api_url = process.env.REACT_APP_API_URL + "deleteList";
    dispatch(setProcessing(true));
    axios
      .post(api_url, {
        list_id: list_id,
      })
      .then((response) => {
        if (response["data"]["status"] == "200") {
          dispatch(setProcessing(false));
        }
        if (response["data"]["status"] == "500") {
          dispatch(setProcessing(false));
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formatter = new Intl.DateTimeFormat("ja-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  return (
    <section class=" clear-right bg-white py-1 lg:py-[10px]">
      <div class="container">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full px-4">
            <div class="max-w-full overflow-x-auto">
              {isLoading || isProcessing ? (
                <Loader />
              ) : (
                <table class="table-auto w-full">
                  <thead>
                    <tr class="bg-primary text-center">
                      {tableHeaders.map((header, key) => {
                        return (
                          <th
                            key={key}
                            class="
                           w-1/6
                           h-[16px]
                           min-w-[160px]
                           text-[13px]
                           font-semibold
                           text-white
                           py-2
                           lg:py-3
                           px-2
                           lg:px-3
                           border-l border-transparent
                           "
                          >
                            {header}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody>
                    {tableData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-l border-[#E8E8E8]
                           "
                          >
                            {countPerPage * (currentPage - 1) + i + 1}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                          >
                            {formatter.format(Date.parse(item.created_at))}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                          >
                            {item.list_status == 0 && <span>待機中</span>}
                            {item.list_status == 1 && <span>出品済み</span>}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-[#E8E8E8]
                           "
                          >
                            {item.name}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                          >
                            {item.item_count}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-[#F3F6FF]
                           border-b border-[#E8E8E8]
                           "
                          >
                            {item.listed_count}
                          </td>
                          <td
                            class="
                           text-center text-dark
                           font-medium
                           text-base
                           py-5
                           px-2
                           bg-white
                           border-b border-r border-[#E8E8E8]
                           "
                          >
                            {item.list_status == 0 && (
                              <div className="flex space-x-1">
                                <button
                                  id={item.id}
                                  class="
                              border border-primary
                              py-2
                              px-3
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              "
                                  onClick={handleListButton}
                                >
                                  出品
                                </button>
                                <button
                                  id={item.id}
                                  class="
                            border border-primary
                            py-2
                            px-3
                            text-primary
                            inline-block
                            rounded
                            hover:bg-primary hover:text-white
                            "
                                  onClick={handleDeleteList}
                                >
                                  削除
                                </button>
                              </div>
                            )}
                            {item.list_status == 1 && (
                              <div className="flex  space-x-1">
                                <Link
                                  to={`/listingDetailPage/${item.id}`}
                                  href="javascript:void(0)"
                                  class="
                              border border-primary
                              py-2
                              px-3
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              "
                                  onClick={handleResetPagnation}
                                >
                                  詳細
                                </Link>
                                <button
                                  id={item.id}
                                  class="
                        border border-primary
                        py-2
                        px-3
                        text-primary
                        inline-block
                        rounded
                        hover:bg-primary hover:text-white
                        "
                                  onClick={handleDeleteList}
                                >
                                  削除
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ListTable;
