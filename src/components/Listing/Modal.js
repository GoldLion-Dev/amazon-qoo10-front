import { useState } from "react";
import axios from "axios";
import upload from "../../assets/upload.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserId } from "../../utils/getUserId";

export default function Modal({ handleUpload }) {
  const baseURL = process.env.REACT_APP_API_URL + "uploadCSVFile";
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState("");

  const handleChangeName = (event) => {
    setFileName(event.target.value);
  };
  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const user_id = getUserId();
    const formData = new FormData();
    formData.append("csvFile", file);
    formData.append("filename", fileName);
    formData.append("userId", user_id);
    axios
      .post(baseURL, formData)
      .then((response) => {
        if (response["data"]["status"] == "500") {
          toast.error("csvファイル種類を確認してください", {
            autoClose: 6000,
          });
        }
        if (response["data"]["status"] == "200") {
          toast.success("csvファイルが正常にアップロードされました", {
            autoClose: 6000,
          });
          handleUpload(response["data"]["id"]);
          setShowModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <button
        type="button"
        class="float-right space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        onClick={() => setShowModal(true)}
      >
        <img src={upload} className="float-left" width="20" height="20" />
        <span>CSV アップロード</span>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    csvファイルのアップロード
                  </h3>
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
                <div className="relative p-6 flex-auto">
                  <form onSubmit={handleSubmit}>
                    <div class="mb-6">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-90"
                      >
                        csvファイルのタイトルを入力
                      </label>
                      <input
                        type="text"
                        id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
                        placeholder=""
                        required
                        onChange={handleChangeName}
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        CSV ファイル
                      </label>
                      <input
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="file_input"
                        type="file"
                        required
                        accept=".csv, text/csv"
                        onChange={handleChangeFile}
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        アップロード
                      </button>
                      <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setShowModal(false)}
                      >
                        キャンセル
                        <ToastContainer />
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
}
