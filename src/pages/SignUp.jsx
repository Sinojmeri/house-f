import { useForm } from 'react-hook-form';
import { signUp } from '../controllers/userApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const { register, handleSubmit } = useForm();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = async () => {
    if (password === confirmPassword) {
      try {
        await signUp({ firstName, lastName, email, password });
        alert('Registered successfully!');
      } catch (error) {
        alert('Error registering: ' + error.message);
      }
    } else {
      alert('Passwords do not match!');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            {...register('lastName', { required: true })}
            placeholder="Last name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            {...register('passwordConfirm', { required: true })}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-blue-600 transition-colors"
          onClick={<Link to={'/Login'} />}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
