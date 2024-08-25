export default function Login() {
  return (
    <div className="flex my-7 items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 md:w-[500px] ">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Welcome User!
        </h1>
        <form action="#">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Forget Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="my-4 flex gap-2 justify-center items-center">
          <div className="h-1 bg-slate-300 w-[100px] md:w-[170px]" />
          <p className="text-center p-1">Or with</p>
          <div className="h-1 bg-slate-300 w-[100px] md:w-[170px]" />
        </div>
        <div className="flex flex-col gap-4">
          <button className="relative flex items-center justify-center md:w-[300px] p-2 border-2 border-gray-300 rounded-md hover:bg-slate-100 md:mx-auto">
            <img
              src="/google_icon.png"
              alt="google_icon"
              className="absolute left-3 w-[30px] h-[30px]"
            />
            <span>Login With Google</span>
          </button>
          <h1 className="text-center">
            Don&apos;t have an account ?{' '}
            <span className="text-blue-700 cursor-pointer hover:underline">
              Sign up
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}