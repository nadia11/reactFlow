import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/configs/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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
      sessionStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success('Login successful!');
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = () => {
    const googleSignInUrl = 'http://localhost:5000/auth/google';
  
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
  
    const popup = window.open(
      googleSignInUrl,
      'GoogleSignIn',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  
    // Listen for messages from the popup
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:5000') {
        // Ignore messages from unknown origins
        return;
      }
  
      const { token, user } = event.data;
  
      if (token) {
        // Save token and user info in sessionStorage
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
  
        // Redirect to MyBots page
        window.location.href = '/myBots';
      } else {
        alert('Google Sign-In failed. Please try again.');
      }
    });
  
    const pollTimer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(pollTimer);
        alert('Google Sign-In process completed or canceled.');
      }
    }, 1000);
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
        <p className="text-md text-gray-600 text-center pt-5">
          Don't have an account?{' '}
          <a
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
