import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/configs/api';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
 const navigate= useNavigate();
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await api.post('/auth/login', {
        ...data,
        role: 'BOTCREATOR',
      });
      sessionStorage.setItem('token', response.data.token);
      alert('Login successful!');
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = () => {
    // Logic for Google Sign-In (using a library like react-google-login)
    alert('Google Sign-In not implemented.');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full my-3 bg-green-500 text-white p-2 rounded hover:bg-green-400"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
