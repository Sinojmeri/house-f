import { useForm } from 'react-hook-form';

export default function SignUp() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-[165px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an account
        </h2>

        <div className="mb-4">
          <input
            type="text"
            {...register('firstName', { required: true })}
            placeholder="First name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            {...register('lastName', { required: true })}
            placeholder="Last name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
