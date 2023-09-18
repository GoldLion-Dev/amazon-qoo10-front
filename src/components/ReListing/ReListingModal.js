import { React, useState, useRef } from "react";
import axios from "axios";
import { getUserId } from "../../utils/getUserId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  setShowToastForReList,
  setResultStatus,
} from "../../pages/ReListing/reListingSlice";

const ReListingModal = ({ item }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const api_root = process.env.REACT_APP_API_URL;
  const submitElement = useRef();

  const [inputs, setInputs] = useState({
    title: item.title,
    inventory: item.inventory,
    price: item.price,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(api_root + "relist", {
        data: inputs,
        user_id: getUserId(),
        item_no: submitElement.current.id,
      })
      .then((response) => {
        if (response["data"]["status"] == "200") {
          setShowModal(false);
          dispatch(setShowToastForReList(Date.now()));
          dispatch(setResultStatus("200"));
        }
        if (response["data"]["status"] == "500") {
          setShowModal(false);
          dispatch(setShowToastForReList(Date.now()));
          dispatch(setResultStatus("500"));
        }
      });
  };
  return (
    <>
      <button
        type="button"
        className=" space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        onClick={() => setShowModal(true)}
      >
        <span>再出品</span>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[30%] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h5 className="text-3xl font-semibold">再出品</h5>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto ">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-90 float-left"
                      >
                        タイトル
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-90 float-left"
                      >
                        価格
                      </label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={inputs.price || ""}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        for="inventory"
                        className="block mb-2 text-sm font-medium text-gray-90 float-left"
                      >
                        在庫
                      </label>
                      <input
                        type="text"
                        id="inventory"
                        name="inventory"
                        value={inputs.inventory || ""}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                        placeholder=""
                        required
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        id={item.item_no}
                        ref={submitElement}
                      >
                        再出品
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setShowModal(false)}
                      >
                        キャンセル
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ReListingModal;
