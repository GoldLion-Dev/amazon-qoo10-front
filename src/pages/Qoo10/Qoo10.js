import axios from "axios";
import { useState, useRef } from "react";
import { Input } from "../../components/Qoo10/Input";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import qoo10 from "../../assets/qoo10.png";

const Qoo10 = () => {
  const methods = useForm();
  const baseURL = process.env.REACT_APP_API_URL + "getAPIKey";
  const registerURL = process.env.REACT_APP_API_URL + "registerShop";
  const [apiKey, setApiKey] = useState();

  const handleChange = () => {};

  const getUserId = () => {
    const tokenString = localStorage.getItem("token");
    const token = JSON.parse(tokenString);
    return token?.id;
  };

  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post(registerURL, {
        data: data,
        apiKey: apiKey,
        userId: getUserId(),
      })
      .then((response) => {
        if (response["data"]["status"] == 200) {
          toast.success("店舗情報が登録されました。", { autoClose: 6000 });
        }
        if (response["data"]["status"] == 300) {
          toast.warning("店舗情報の登録に問題があります。", {
            autoClose: 6000,
          });
        }
        if (response["data"]["status"] == 500) {
          toast.error("店舗情報の登録に問題があります。", { autoClose: 6000 });
        }
      });
  });

  const handleGetKey = methods.handleSubmit((data) => {
    console.log(data);
    axios
      .post(baseURL, {
        data: data,
      })
      .then((response) => {
        if (response["data"]["status"] == 200) {
          const result = JSON.parse(response["data"]["key"]);
          if (result["ResultObject"] != null) {
            toast.success("APIキーが正常に生成されました。");
            setApiKey(result["ResultObject"]);
          } else {
            toast.error("ストアID、パスワード、APIトークンをご確認ください");
          }
        }
        if (response["data"]["status"] == 300) {
          toast.error("ストアID、パスワード、APIトークンをご確認ください");
        }
      });
  });

  return (
    <>
      <div class="flex items-center justify-center h-screen ">
        <div class="min-w-fit flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] sm:w-[30%] w-full ">
          <div class="mb-8 flex justify-center">
            <img class="w-24" src={qoo10} alt="" />
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              autoComplete="off"
              class=""
            >
              <div class="flex flex-col text-sm rounded-md ">
                <Input
                  label="ストアー ID"
                  type="text"
                  id="id"
                  name="id"
                  placeholder="ストアIDを入力してください。"
                  validFlag={true}
                  value=""
                  handleChange={handleChange}
                />
                <Input
                  label="ストアー Password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="ストアー Password"
                  validFlag={true}
                  value=""
                />
                <Input
                  label="Qoo10 API Token"
                  type="text"
                  id="apiToken"
                  name="apiToken"
                  placeholder="Qoo10 API Token"
                  validFlag={true}
                  value=""
                />

                <input
                  id="apiKey"
                  type="text"
                  name="apiKey"
                  class="mb-0 mt-5 rounded-[4px] border border-slate-500 p-3  hover:outline-none focus:outline-none hover:border-slate-900 "
                  placeholder="Qoo10 Auth Key"
                  value={apiKey}
                  onChange={handleChange}
                />
              </div>
              <button
                class="w-full mt-2 space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                type="submit"
                onClick={handleGetKey}
              >
                Auth Key 生成
              </button>
              <button
                type="submit"
                class="w-full space-x-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none   shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                onClick={onSubmit}
              >
                保存
              </button>
              <ToastContainer />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
};
export default Qoo10;
