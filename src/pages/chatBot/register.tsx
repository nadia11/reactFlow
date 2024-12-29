import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import api from '@/configs/api';
import { useNavigate } from 'react-router-dom';

interface RegisterFormValues {
  email: string;
  password: string;
  role: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
  const [showPassword, setShowPassword] = useState(false);
const navigate= useNavigate();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      await api.post('/auth/register', data);
      alert('Registration successful!');
     navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-700">Register</h2>
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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 mb-2">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your role (e.g., BOTCREATOR)"
            {...register('role', { required: 'Role is required' })}
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full my-3 bg-green-500 text-white p-2 rounded hover:bg-green-400"
        >
          Register
        </button>
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
