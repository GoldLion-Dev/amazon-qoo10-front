const SignUp = () => {
  return (
    <>
      <div
        class="flex min-h-screen items-center justify-center bg-cover"
        style={{
          backgroundImage: `url('/img/background3.jpg')`,
        }}
      >
        <div class="relative h-[600px] w-[400px] overflow-hidden rounded-3xl">
          <div class="absolute bottom-0 flex h-full w-full flex-col rounded-t-3xl bg-white bg-opacity-20 shadow">
            <form class="mt-20 space-y-6 px-10 py-5 text-center">
              <div class="group relative">
                <input
                  type="text"
                  id="username"
                  required
                  class="peer h-11 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                />
                <label
                  for="username"
                  class="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Username
                </label>
              </div>
              <div class="group relative">
                <input
                  type="text"
                  id="username"
                  required
                  class="peer h-11 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                />
                <label
                  for="username"
                  class="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Email
                </label>
              </div>

              <div class="group relative">
                <input
                  type="password"
                  id="password"
                  required
                  class="peer h-11 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                />
                <label
                  for="password"
                  class="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Password
                </label>
              </div>

              <div class="group relative">
                <input
                  type="password"
                  id="confirm_password"
                  required
                  class="peer h-11 w-full rounded-3xl bg-gray-100 px-4 text-sm outline-none"
                />
                <label
                  for="confirm_password"
                  class="absolute left-2 top-0 flex h-full transform items-center pl-2 text-base transition-all duration-300 group-focus-within:-top-7 group-focus-within:h-1/2 group-focus-within:pl-0 group-focus-within:text-base group-focus-within:text-white peer-valid:-top-7 peer-valid:h-1/2 peer-valid:pl-0 peer-valid:text-base peer-valid:text-white"
                >
                  Confirm Password
                </label>
              </div>
              <button class="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800">
                Login
              </button>

              <button class="h-12 w-full rounded-3xl bg-blue-900 text-white transition-all duration-300 hover:bg-blue-800">
                Cancel
              </button>

              <a
                href="#"
                class="inline-flex !w-auto justify-center font-medium text-white"
              >
                Forgot password?
              </a>
            </form>

            <p class="gap-1 text-center text-white">
              Don't have an account?
              <a
                href="#"
                class="font-semibold text-blue-900 hover:text-blue-800"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
