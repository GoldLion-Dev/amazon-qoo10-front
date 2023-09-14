import { useState } from "react";
import axios from "axios";
import { getUserId } from "../../utils/getUserId";

const ImageEdit = () => {
  const baseURL = process.env.REACT_APP_API_URL + "uploadImage";
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();

  const handleChangeImage = (event) => {
    const filename = event.target.files[0].name;
    setFileName(filename);
    setFile(event.target.files[0]);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("imagefile", file);

  //   axios.post(baseURL, formData).then((response) => {
  //     console.log(response);
  //   });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imagefile", file);
    formData.append("userId", getUserId());
    try {
      const response = await axios({
        data: formData,
        url: baseURL,
        method: "POST",
        responseType: "blob", // Important: responseType must be set to 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div className="container mt-10">
        <form onSubmit={handleSubmit}>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                {fileName != "" && <div>{fileName}</div>}
                {fileName == "" && (
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                )}

                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={handleChangeImage}
              />
            </label>
          </div>

          <div class="flex items-center justify-center ">
            <div class="min-w-fit flex justify-around border bg-white px-6 py-14 shadow-md rounded-[4px] w-full ">
              <button
                class="w-[20%] space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                type="submit"
              >
                画像編集
              </button>
              <button
                class="w-[20%] space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                type="button"
              >
                出品画像 ダウンロード
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default ImageEdit;
