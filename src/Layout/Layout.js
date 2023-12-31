import { Outlet, Link } from "react-router-dom";
import { changeLoginStatus } from "../pages/Login/loginSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  const handleLogout = (event) => {
    localStorage.removeItem("token");
    dispatch(changeLoginStatus(""));
  };
  return (
    <>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>

                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <Link
                    to={"/listing"}
                    href="#"
                    class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    出品
                  </Link>
                  <Link
                    to={"/relisting"}
                    href="#"
                    class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    再出品
                  </Link>

                  <Link
                    to={"/image_edit"}
                    href="#"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    画像処理
                  </Link>
                  <Link
                    to={"/qoo10"}
                    href="#"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Qoo10
                  </Link>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                onClick={handleLogout}
              >
                ログアウト
              </button>
              <button
                type="button"
                class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <Link
              to={"/listing"}
              href="#"
              class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              出品
            </Link>
            <Link
              to={"/relisting"}
              href="#"
              class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              再出品
            </Link>
            <Link
              to={"/image_edit"}
              href="#"
              class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              画像処理
            </Link>
            <Link
              to={"/qoo10"}
              href="#"
              class=" text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Qoo10
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Layout;
