import axios from "axios";
import { Input } from "../../components/Login/Input";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { changeLoginStatus } from "./loginSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const methods = useForm();
  const baseURL = process.env.REACT_APP_API_URL + "login";
  const dispatch = useDispatch();

  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post(baseURL, {
        data: data,
      })
      .then((response) => {
        toast.error(response["data"]["message"], { autoClose: 6000 });
        if (response["data"]["status"] == 200) {
          toast.success("ユーザーのログインに成功しました。");
          dispatch(changeLoginStatus(Date.now()));
          localStorage.setItem(
            "token",
            JSON.stringify(response["data"]["user"])
          );
        }
      });
  });

  return (
    <>
      <div
        class="flex min-h-screen items-center justify-center bg-cover"
        style={{
          backgroundImage: `url('/img/background3.jpg')`,
        }}
      >
        <div class="relative h-[600px] w-[400px] overflow-hidden rounded-3xl">
          <div className="flex justify-center items-center mt-10">
            <h2 className="text-white text-[32px]">ログイン</h2>
          </div>
          <div class="absolute bottom-0 flex h-full w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
            <FormProvider {...methods}>
              <form
                onSubmit={(e) => e.preventDefault()}
                noValidate
                autoComplete="off"
                class="mt-20 space-y-8 px-10 py-7 text-center"
              >
                <Input
                  label="メールアドレス"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="メールアドレスを入力してください"
                />
                <Input
                  label="パスワード"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="パスワードを入力してください"
                />
                <Input
                  label="ライセンス"
                  type="text"
                  id="license"
                  name="license"
                  placeholder="ライセンスを入力してください"
                />
                <button
                  class="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800"
                  onClick={onSubmit}
                >
                  ログイン
                </button>

                <button class="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800">
                  登録
                </button>
                <ToastContainer />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
