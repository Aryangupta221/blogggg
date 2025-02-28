import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      await authService.createAccount(data);
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="mx-auto w-full max-w-md bg-white rounded-xl p-8 shadow-soft">
        <div className="mb-6 flex justify-center">
          <Logo width="80px" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline transition-smooth"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-500 text-center mt-4 text-sm">{error}</p>
        )}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register('name', { required: true })}
          />
          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;