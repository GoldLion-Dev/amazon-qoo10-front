import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  resetPagnation,
  setProcessing,
} from "../../pages/Listing/listingSlice";
import Loader from "./Loader";
import { getUserId } from "../../utils/getUserId";

const ListTable = ({ tableHeaders, tableData, isLoading }) => {
  const listURL = process.env.REACT_APP_API_URL + "listProduct";
  const isProcessing = useSelector((state) => state.listing.isProcessing);
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
        if (response["data"]["status"] == "success") {
        }
        dispatch(setProcessing(false));
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
                            {i + 1}
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
                            {item.list_status == 0 && <span>waiting</span>}
                            {item.list_status == 1 && <span>listed</span>}
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
                              <button
                                id={item.id}
                                class="
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              "
                                onClick={handleListButton}
                              >
                                List
                              </button>
                            )}
                            {item.list_status == 1 && (
                              <Link
                                to={`/listingDetailPage/${item.id}`}
                                href="javascript:void(0)"
                                class="
                              border border-primary
                              py-2
                              px-6
                              text-primary
                              inline-block
                              rounded
                              hover:bg-primary hover:text-white
                              "
                                onClick={handleResetPagnation}
                              >
                                Detail
                              </Link>
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
    </section>
  );
};

export default ListTable;
